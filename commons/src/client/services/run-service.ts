import { AxiosInstance } from 'axios';
import { LoggerInterface } from '../../utils/logger';
import { TidenError } from '../../utils/tiden-error';
import { TidenOptionsType } from '../../models/config/TidenOptionsType';
import { processError } from './api-error-handler';

export class RunService {
  constructor(
    private readonly logger: LoggerInterface,
    private readonly http: AxiosInstance,
  ) {}

  /**
   * Creates a Tiden run and returns its per-product seq number (int32).
   * `environment` is a slug: the server resolves it and auto-creates
   * unknown slugs. An empty title gets the server-side default.
   */
  async createRun(config: TidenOptionsType, environment?: string): Promise<number> {
    if (config.run.id) {
      return config.run.id; // sharded CI: pre-created run
    }
    try {
      const body = {
        title: config.run.title ?? '',
        description: config.run.description ?? '',
        environment: environment ?? '',
        branch: config.run.branch ?? '',
        configurations: config.configurations
          ? Object.fromEntries(config.configurations.values.map((v) => [v.name, v.value]))
          : {},
        client_meta: config.clientMeta ?? {},
      };
      this.logger.logDebug(`Creating test run: ${JSON.stringify(body)}`);
      const { data } = await this.http.post<{ run?: { seqNum?: number } }>(
        `/v1/products/${config.product}/runs`, body,
      );
      const seqNum = data.run?.seqNum;
      if (!seqNum) {
        throw new TidenError('Failed to create test run');
      }
      this.logger.logDebug(`Run create response: seqNum=${seqNum}`);
      return seqNum;
    } catch (error) {
      throw processError(error, 'Error creating test run');
    }
  }

  /**
   * Completes the run. Server-idempotent for already-completed runs, so the
   * upstream pre-flight GET is gone. Completes by default; only skips when
   * run.complete is explicitly false (sharded CI: the orchestrator owns completion).
   */
  async completeRun(runId: number, config: TidenOptionsType): Promise<void> {
    // Complete by default; only an explicit `complete: false` (sharded CI:
    // the orchestrator owns completion) skips it.
    if (config.run.complete === false) {
      return;
    }
    try {
      await this.http.post(`/v1/products/${config.product}/runs/${runId}:complete`, {});
      this.logger.log(`Test run #${runId} completed`);
    } catch (error) {
      throw processError(error, 'Error on completing run');
    }
  }
}
