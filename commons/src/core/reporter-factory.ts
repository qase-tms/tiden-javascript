import {
  InternalReporterInterface,
  RunReporter,
  ReportReporter,
} from '../reporters';
import { ModeEnum, OptionsType } from '../options';
import { ConfigType } from '../config';
import { EnvApiEnum, EnvTidenEnum } from '../env';
import { LoggerInterface } from '../utils/logger';
import { DisabledException } from '../utils/disabled-exception';
import { HostData } from '../models/host-data';
import { TidenOptionsType } from '../models/config/TidenOptionsType';
import { TidenApiClient } from '../client/tiden-client';
import { DriverEnum, FsWriter } from '../writer';

/**
 * Builds a mode-specific InternalReporterInterface. Throws DisabledException
 * for `ModeEnum.off` so callers can distinguish "disabled-by-config" from a
 * real failure.
 */
export class ReporterFactory {
  constructor(
    private readonly logger: LoggerInterface,
    private readonly hostData: HostData,
  ) {}

  create(
    mode: ModeEnum,
    options: ConfigType & OptionsType,
    withState: boolean,
  ): InternalReporterInterface {
    switch (mode) {
      case ModeEnum.tiden:
        return this.createRunReporter(options, withState);
      case ModeEnum.report:
        return this.createReport(options);
      case ModeEnum.off:
        throw new DisabledException();
      default:
        throw new Error(`Unknown mode type`);
    }
  }

  private createRunReporter(
    options: ConfigType & OptionsType,
    withState: boolean,
  ): RunReporter {
    if (!options.tiden?.api?.token) {
      throw new Error(
        `Either "tiden.api.token" parameter or "${EnvApiEnum.token}" environment variable is required in "tiden" mode`,
      );
    }
    if (!options.tiden.product) {
      throw new Error(
        `Either "tiden.product" parameter or "${EnvTidenEnum.product}" environment variable is required in "tiden" mode`,
      );
    }
    if (!options.tiden?.api?.baseUrl) {
      throw new Error(
        `Either "tiden.api.baseUrl" parameter or "${EnvApiEnum.baseUrl}" environment variable is required in "tiden" mode`,
      );
    }

    const tiden = options.tiden as TidenOptionsType;
    tiden.clientMeta = {
      framework: options.frameworkName ?? '',
      reporter: options.reporterName ?? '',
      framework_version: this.hostData.framework,
      reporter_version: this.hostData.reporter,
      commons_version: this.hostData.commons,
      os: this.hostData.system,
      node: this.hostData.language,
    };

    const apiClient = new TidenApiClient(
      this.logger,
      tiden,
      options.environment,
      options.rootSuite,
    );

    return new RunReporter(
      this.logger,
      apiClient,
      withState,
      tiden.product,
      tiden.batch?.size,
      tiden.run?.id,
    );
  }

  private createReport(options: ConfigType & OptionsType): ReportReporter {
    const localOptions = options.report?.connections?.[DriverEnum.local];
    const writer = new FsWriter(localOptions);

    return new ReportReporter(
      this.logger,
      writer,
      options.frameworkPackage,
      options.reporterName,
      options.environment,
      options.rootSuite,
      options.tiden?.run?.id,
      this.hostData,
    );
  }
}
