import { AxiosInstance, isAxiosError } from 'axios';
import { createTidenClient } from './tiden-http';
import { IClient } from './interface';
import { RunService } from './services/run-service';
import { AttachmentService } from './services/attachment-service';
import { ResultTransformer } from './services/result-transformer';
import { TidenResultCreate } from './models/tiden-result';
import { processError } from './services/api-error-handler';
import { LoggerInterface } from '../utils/logger';
import { TestOpsOptionsType } from '../models/config/TestOpsOptionsType';
import { Attachment, TestResultType } from '../models';

interface ReportErrorDetail { index?: number; resultId?: string; code?: string; message?: string; ['@type']?: string }

/**
 * Facade over the Tiden REST API — replaces the generated Qase
 * `qase-api-client`/`qase-api-v2-client` packages (ClientV1/ClientV2).
 */
export class TidenApiClient implements IClient {
  private readonly http: AxiosInstance;
  private readonly runService: RunService;
  private readonly attachmentService: AttachmentService;
  private readonly resultTransformer: ResultTransformer;

  constructor(
    private readonly logger: LoggerInterface,
    private readonly config: TestOpsOptionsType,
    private readonly environment: string | undefined,
    rootSuite: string | undefined,
  ) {
    this.http = createTidenClient(config.api.baseUrl ?? '', config.api.token);
    this.runService = new RunService(logger, this.http);
    this.attachmentService = new AttachmentService(logger, this.http);
    this.resultTransformer = new ResultTransformer(logger, rootSuite);
  }

  async createRun(): Promise<number> {
    return this.runService.createRun(this.config, this.environment);
  }

  async completeRun(runId: number): Promise<void> {
    return this.runService.completeRun(runId, this.config);
  }

  async uploadAttachment(attachment: Attachment): Promise<string> {
    return this.attachmentService.uploadAttachment(this.config.project, attachment);
  }

  /** Public run report links have no Tiden equivalent in v1. */
  async enablePublicReport(_runId: number): Promise<void> {
    this.logger.logDebug('Public report links are not supported; skipping');
  }

  async uploadResults(runId: number, results: TestResultType[]): Promise<void> {
    try {
      const models = await Promise.all(
        results.map((result) =>
          this.resultTransformer.transformWithDefect(
            result,
            (a) => this.attachmentService
              .uploadAttachments(this.config.project, [a], this.config.uploadAttachments ?? true)
              .then((hashes) => hashes[0] ?? ''),
            this.config.defect ?? false,
          ),
        ),
      );
      await this.postResultsWithRetry(runId, models);
    } catch (error) {
      throw processError(error, 'Error on uploading results', results);
    }
  }

  /** 429-only retry (Retry-After honored, exp backoff, 30s cap); 400 is
   *  terminal — resending an identical batch fails identically, so log
   *  every per-entry ReportError from details[] and re-throw. */
  private async postResultsWithRetry(runId: number, models: TidenResultCreate[], maxRetries = 5): Promise<void> {
    let delay = 1000;
    for (let attempt = 0; ; attempt++) {
      try {
        await this.http.post(`/v1/products/${this.config.project}/runs/${runId}/results:report`, { results: models });
        return;
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 429 && attempt < maxRetries) {
          const retryAfter = Number(error.response.headers['retry-after']);
          const wait = Number.isFinite(retryAfter) && retryAfter >= 0 ? retryAfter * 1000 : delay;
          await new Promise((r) => setTimeout(r, Math.min(wait, 30_000)));
          delay = Math.min(delay * 2, 30_000);
          continue;
        }
        if (isAxiosError(error) && error.response?.status === 400) {
          const details = (error.response.data as { details?: ReportErrorDetail[] } | undefined)?.details ?? [];
          for (const d of details) {
            if ((d['@type'] ?? '').endsWith('ReportError')) {
              this.logger.logError(`Result #${d.index ?? '?'} (id=${d.resultId ?? '<none>'}) rejected: ${d.code ?? ''}: ${d.message ?? ''}`);
            }
          }
        }
        throw error;
      }
    }
  }
}
