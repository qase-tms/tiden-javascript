import {
  InternalReporterInterface,
  TestOpsReporter,
  ReportReporter,
} from '../reporters';
import { ModeEnum, OptionsType } from '../options';
import { ConfigType } from '../config';
import { EnvApiEnum, EnvTestOpsEnum } from '../env';
import { LoggerInterface } from '../utils/logger';
import { DisabledException } from '../utils/disabled-exception';
import { HostData } from '../models/host-data';
import { TestOpsOptionsType } from '../models/config/TestOpsOptionsType';
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
      case ModeEnum.testops:
        return this.createTestOps(options, withState);
      case ModeEnum.report:
        return this.createReport(options);
      case ModeEnum.off:
        throw new DisabledException();
      default:
        throw new Error(`Unknown mode type`);
    }
  }

  private createTestOps(
    options: ConfigType & OptionsType,
    withState: boolean,
  ): TestOpsReporter {
    if (!options.testops?.api?.token) {
      throw new Error(
        `Either "testops.api.token" parameter or "${EnvApiEnum.token}" environment variable is required in "testops" mode`,
      );
    }
    if (!options.testops.project) {
      throw new Error(
        `Either "testops.project" parameter or "${EnvTestOpsEnum.project}" environment variable is required in "testops" mode`,
      );
    }

    const testops = options.testops as TestOpsOptionsType;
    testops.clientMeta = {
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
      testops,
      options.environment,
      options.rootSuite,
    );

    return new TestOpsReporter(
      this.logger,
      apiClient,
      withState,
      testops.project,
      testops.batch?.size,
      testops.run?.id,
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
      options.testops?.run?.id,
      this.hostData,
    );
  }
}
