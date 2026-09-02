import { ModeEnum } from './mode-enum';

import { DriverEnum, FsWriterOptionsType } from '../writer';
import { TidenOptionsType } from '../models/config/TidenOptionsType';

type RecursivePartial<T> = {
  [K in keyof T]?: RecursivePartial<T[K]> | undefined;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type ConnectionsType = {
  [DriverEnum.local]?: FsWriterOptionsType;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type AdditionalReportOptionsType = {
  driver?: `${DriverEnum}`;
  connections?: ConnectionsType;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type LoggingOptionsType = {
  console?: boolean | undefined;
  file?: boolean | undefined;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type OptionsType = {
  frameworkPackage: string;
  frameworkName: string;
  reporterName: string;
  mode?: `${ModeEnum}` | undefined;
  fallback?: `${ModeEnum}` | undefined;
  captureLogs?: boolean | undefined;
  debug?: boolean | undefined;
  environment?: string | undefined;
  rootSuite?: string | undefined;
  /**
   * Base directory the spec-file segment of a case signature is resolved
   * against. Defaults to `process.cwd()`.
   *
   * Set it when the runner's working directory is not the root you want that
   * segment measured from — a monorepo running vitest from a sub-package, for
   * instance. The signature is matched byte-for-byte server-side, so every
   * producer reporting into one product must agree on this base or the same
   * test lands as two cases.
   */
  rootDir?: string | undefined;
  statusMapping?: Record<string, string> | undefined;
  logging?: RecursivePartial<LoggingOptionsType> | undefined;
  tiden?:
    | RecursivePartial<TidenOptionsType>
    | undefined;
  report?: RecursivePartial<AdditionalReportOptionsType> | undefined;
  profilers?: string[] | undefined;
  networkProfiler?: {
    skip_domains?: string[] | undefined;
    track_on_fail?: boolean | undefined;
  } | undefined;
};
