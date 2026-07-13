import { AxiosError, AxiosInstance } from 'axios';
import FormData from 'form-data';
import { createReadStream, statSync } from 'fs';
import { Readable } from 'stream';
import { Attachment } from '../../models';
import { LoggerInterface } from '../../utils/logger';
import { isAxiosError } from '../../utils/is-axios-error';
import { processError } from './api-error-handler';

const MAX_FILE_SIZE = 32 * 1024 * 1024; // 32 MB per file
const MAX_REQUEST_SIZE = 128 * 1024 * 1024; // 128 MB per request
const MAX_FILES_PER_REQUEST = 20; // 20 files per request

const BASE64_PATTERN = /^[A-Za-z0-9+/=]+$/;
// The round-trip check only catches malformed/misplaced padding: ANY
// complete, unpadded base64-alphabet string round-trips regardless of
// length, so a plain word like "abcd" is indistinguishable from genuine
// base64 by round-trip alone. This length floor is therefore the sole
// heuristic separating short plain words from base64; 8 (two full groups)
// keeps common words as utf8 at the cost of misreading genuinely
// base64-encoded content shorter than 6 bytes as literal text — an
// acceptable trade-off since real attachments are far larger.
const MIN_BASE64_LENGTH = 8;

/**
 * Heuristically decide whether a string is base64-encoded content rather
 * than plain utf8 text. Requires ALL of: base64-alphabet-only characters,
 * a length that's a multiple of 4, a minimum length (see MIN_BASE64_LENGTH),
 * and a decode/re-encode round-trip match (catches non-canonical padding).
 */
function looksLikeBase64(value: string): boolean {
  if (!BASE64_PATTERN.test(value)) return false;
  if (value.length % 4 !== 0) return false;
  if (value.length < MIN_BASE64_LENGTH) return false;

  const normalize = (s: string): string => s.replace(/=+$/, '');
  const reencoded = Buffer.from(value, 'base64').toString('base64');
  return normalize(reencoded) === normalize(value);
}

interface AttachmentData {
  name: string;
  value: Buffer | Readable;
  contentType?: string;
}

export class AttachmentService {
  constructor(
    private readonly logger: LoggerInterface,
    private readonly http: AxiosInstance,
  ) {}

  async uploadAttachment(projectCode: string, attachment: Attachment): Promise<string> {
    try {
      const data = this.prepareAttachmentData(attachment);
      const response = await this.postAttachmentBatch(projectCode, [data]);
      return response.data.result?.[0]?.hash ?? '';
    } catch (error) {
      throw processError(error, 'Error on uploading attachment');
    }
  }

  async uploadAttachments(
    projectCode: string,
    attachments: Attachment[],
    uploadEnabled: boolean,
  ): Promise<string[]> {
    if (!uploadEnabled) {
      return [];
    }

    const uploadedHashes: string[] = [];
    const validAttachments: Attachment[] = [];

    for (const attachment of attachments) {
      if (!attachment) continue;

      this.ensureAttachmentSize(attachment);

      if (attachment.size === 0) {
        this.logger.logError(
          `Cannot determine size for attachment "${attachment.file_path ?? attachment.file_name}". Skipping.`,
        );
        continue;
      }

      if (attachment.size > MAX_FILE_SIZE) {
        this.logger.logError(
          `Attachment "${attachment.file_path ?? attachment.file_name}" exceeds maximum file size (32 MB). ` +
          `File size: ${(attachment.size / (1024 * 1024)).toFixed(2)} MB. Skipping.`,
        );
        continue;
      }

      validAttachments.push(attachment);
    }

    if (validAttachments.length === 0) {
      return uploadedHashes;
    }

    const initialJitter = Math.random() * 500;
    await this.delay(initialJitter);

    const batches = this.groupIntoBatches(validAttachments);
    this.logger.logDebug(`Uploading ${validAttachments.length} attachments in ${batches.length} batch(es)`);

    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      if (!batch || batch.length === 0) continue;

      try {
        const batchNames = batch.map(a => a.file_path ?? a.file_name).join(', ');
        this.logger.logDebug(
          `Uploading batch ${i + 1}/${batches.length} with ${batch.length} file(s): ${batchNames}`,
        );

        const batchData = batch.map(a => this.prepareAttachmentData(a));
        const response = await this.uploadWithRetry(projectCode, batchData, batchNames);

        if (response.data.result) {
          for (const result of response.data.result) {
            if (result.hash) {
              uploadedHashes.push(result.hash);
            }
          }
        }
      } catch (error) {
        this.logger.logError(`Cannot upload batch ${i + 1}:`, error);
      }

      if (i < batches.length - 1) {
        const baseDelay = 1000;
        const jitter = Math.random() * 300;
        await this.delay(baseDelay + jitter);
      }
    }

    return uploadedHashes;
  }

  private groupIntoBatches(attachments: Attachment[]): Attachment[][] {
    const batches: Attachment[][] = [];
    let currentBatch: Attachment[] = [];
    let currentBatchSize = 0;

    for (const attachment of attachments) {
      const attachmentSize = attachment.size;
      const wouldExceedFileLimit = currentBatch.length >= MAX_FILES_PER_REQUEST;
      const wouldExceedSizeLimit = currentBatchSize + attachmentSize > MAX_REQUEST_SIZE;

      if (wouldExceedFileLimit || wouldExceedSizeLimit) {
        if (currentBatch.length > 0) {
          batches.push(currentBatch);
          currentBatch = [];
          currentBatchSize = 0;
        }
      }

      if (attachmentSize > MAX_REQUEST_SIZE) {
        this.logger.logError(
          `Attachment "${attachment.file_path ?? attachment.file_name}" exceeds maximum request size (128 MB). ` +
          `File size: ${(attachmentSize / (1024 * 1024)).toFixed(2)} MB. Skipping.`,
        );
        continue;
      }

      currentBatch.push(attachment);
      currentBatchSize += attachmentSize;
    }

    if (currentBatch.length > 0) {
      batches.push(currentBatch);
    }

    return batches;
  }

  /** POST one multipart batch to Tiden. Returns the upstream-shaped
   *  `{data: {result: [{hash}]}}` envelope so callers stay unchanged
   *  (Tiden's response body is `{status, result: [{hash, ...}]}`). */
  private async postAttachmentBatch(
    projectCode: string,
    data: AttachmentData[],
  ): Promise<{ data: { result?: { hash?: string }[] } }> {
    const form = new FormData();
    for (const item of data) {
      form.append('file[]', item.value, {
        filename: item.name,
        ...(item.contentType ? { contentType: item.contentType } : {}),
      });
    }
    const response = await this.http.post<{ result?: { hash?: string }[] }>(
      `/v1/products/${projectCode}/attachments:upload`, form,
      { headers: form.getHeaders(), maxBodyLength: Infinity, maxContentLength: Infinity },
    );
    return { data: response.data };
  }

  private async uploadWithRetry(
    projectCode: string,
    data: AttachmentData[],
    attachmentNames: string,
    maxRetries = 5,
    initialDelay = 1000,
  ): Promise<{ data: { result?: { hash?: string }[] } }> {
    let lastError: unknown;
    let delay = initialDelay;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await this.postAttachmentBatch(projectCode, data);
      } catch (error) {
        lastError = error;

        if (isAxiosError(error)) {
          if (error.response?.status === 429) {
            if (attempt < maxRetries) {
              const retryAfter = this.getRetryAfter(error);
              const baseWaitTime = retryAfter ?? delay;
              const jitterPercent = 0.1 + Math.random() * 0.2;
              const jitter = baseWaitTime * jitterPercent;
              const waitTime = Math.floor(baseWaitTime + jitter);

              this.logger.logDebug(
                `Rate limit exceeded (429) for attachment(s) "${attachmentNames}". ` +
                `Retrying in ${waitTime}ms (attempt ${attempt + 1}/${maxRetries})`,
              );

              await this.delay(waitTime);
              delay = Math.min(delay * 2, 30000);
            } else {
              this.logger.logError(
                `Failed to upload attachment(s) "${attachmentNames}" after ${maxRetries} retries due to rate limiting`,
              );
            }
          } else {
            throw error;
          }
        } else {
          throw error;
        }
      }
    }

    throw lastError;
  }

  private getRetryAfter(error: AxiosError): number | null {
    const headers = error.response?.headers;
    if (!headers) return null;

    const retryAfterHeader: unknown = headers['retry-after'];
    if (retryAfterHeader && typeof retryAfterHeader === 'string') {
      const retryAfterSeconds = parseInt(retryAfterHeader, 10);
      if (!isNaN(retryAfterSeconds)) {
        return retryAfterSeconds * 1000;
      }
    }
    return null;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private ensureAttachmentSize(attachment: Attachment): void {
    if (attachment.size > 0) return;

    try {
      if (attachment.file_path) {
        const stats = statSync(attachment.file_path);
        attachment.size = stats.size;
      } else if (attachment.content) {
        if (typeof attachment.content === 'string') {
          if (looksLikeBase64(attachment.content)) {
            attachment.size = Buffer.from(attachment.content, 'base64').length;
          } else {
            attachment.size = Buffer.byteLength(attachment.content, 'utf8');
          }
        } else if (Buffer.isBuffer(attachment.content)) {
          attachment.size = attachment.content.length;
        } else {
          attachment.size = Buffer.byteLength(String(attachment.content), 'utf8');
        }
      }
    } catch (error) {
      this.logger.logDebug(
        `Could not determine size for attachment "${attachment.file_path ?? attachment.file_name}": ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
      attachment.size = 0;
    }
  }

  private prepareAttachmentData(attachment: Attachment): AttachmentData {
    const contentType = typeof attachment.mime_type === 'string' && attachment.mime_type.length > 0
      ? attachment.mime_type
      : undefined;

    if (attachment.file_path) {
      return {
        name: attachment.file_name,
        value: createReadStream(attachment.file_path),
        ...(contentType ? { contentType } : {}),
      };
    }

    return {
      name: attachment.file_name,
      value: typeof attachment.content === 'string'
        ? Buffer.from(attachment.content, looksLikeBase64(attachment.content) ? 'base64' : 'utf8')
        : attachment.content,
      ...(contentType ? { contentType } : {}),
    };
  }
}
