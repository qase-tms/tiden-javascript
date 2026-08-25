import { AxiosInstance, isAxiosError } from 'axios';
import { ResultCreate, TestRunServiceApi } from '@tiden/api-client';
import { createTestRunApi, createTidenClient } from './tiden-http';
import { IClient } from './interface';
import { RunService } from './services/run-service';
import { AttachmentService } from './services/attachment-service';
import { ResultTransformer } from './services/result-transformer';
import { processError } from './services/api-error-handler';
import { LoggerInterface } from '../utils/logger';
import { TidenOptionsType } from '../models/config/TidenOptionsType';
import { Attachment, TestResultType } from '../models';

interface ReportErrorDetail { index?: number; resultId?: string; code?: string; message?: string; ['@type']?: string }

/**
 * Facade over the Tiden REST API.
 *
 * The JSON endpoints (create/report/complete) go through the generated
 * `@tiden/api-client`, so their request/response types track the Tiden
 * OpenAPI contract. Attachment upload stays hand-written: it is a
 * multipart route with no generated operation (see AttachmentService).
 * Both share the one axios instance created here.
 */
export class TidenApiClient implements IClient {
  private readonly http: AxiosInstance;
  private readonly api: TestRunServiceApi;
  private readonly runService: RunService;
  private readonly attachmentService: AttachmentService;
  private readonly resultTransformer: ResultTransformer;

  constructor(
    private readonly logger: LoggerInterface,
    private readonly config: TidenOptionsType,
    private readonly environment: string | undefined,
    rootSuite: string | undefined,
  ) {
    this.http = createTidenClient(config.api.baseUrl ?? '', config.api.token);
    this.api = createTestRunApi(this.http, config.api.baseUrl ?? '');
    this.runService = new RunService(logger, this.api);
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
    return this.attachmentService.uploadAttachment(this.config.product, attachment);
  }

  /** Public run report links have no Tiden equivalent in v1. */
  enablePublicReport(_runId: number): Promise<void> {
    this.logger.logDebug('Public report links are not supported; skipping');
    return Promise.resolve();
  }

  async uploadResults(runId: number, results: TestResultType[]): Promise<void> {
    try {
      const models = await Promise.all(
        results.map((result) =>
          this.resultTransformer.transformWithDefect(
            result,
            (a) => this.attachmentService
              .uploadAttachments(this.config.product, [a], this.config.uploadAttachments ?? true)
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
  private async postResultsWithRetry(runId: number, models: ResultCreate[], maxRetries = 5): Promise<void> {
    let delay = 1000;
    for (let attempt = 0; ; attempt++) {
      try {
        const { data } = await this.api.testRunServiceReportResults({
          productId: this.config.product,
          runSeq: runId,
          reportResultsBody: { results: models },
        });
        // `accepted`/`duplicates` are int64s (strings on the wire). Duplicates
        // are the server's idempotency check recognising a result `id` it has
        // already stored — a re-reported batch is dropped there, not here.
        this.logger.logDebug(
          `Reported ${models.length} result(s): accepted=${data.accepted ?? '?'} duplicates=${data.duplicates ?? '?'}`,
        );
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
