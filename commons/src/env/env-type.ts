import {
  EnvEnum,
  EnvTidenEnum,
  EnvApiEnum,
  EnvRunEnum,
  EnvLocalEnum,
  EnvBatchEnum,
  EnvConfigurationsEnum,
  EnvLoggingEnum,
} from './env-enum';

import { ModeEnum } from '../options';
import { FormatEnum } from '../writer';

export interface EnvType {
  [EnvEnum.mode]?: `${ModeEnum}`;
  [EnvEnum.fallback]?: `${ModeEnum}`;
  [EnvEnum.debug]?: boolean;
  [EnvEnum.environment]?: string;
  [EnvEnum.captureLogs]?: boolean;
  [EnvEnum.rootSuite]?: string;
  [EnvEnum.statusMapping]?: string;

  [EnvTidenEnum.product]?: string;
  [EnvTidenEnum.uploadAttachments]?: boolean;
  [EnvTidenEnum.defect]?: boolean;
  [EnvTidenEnum.statusFilter]?: string;

  [EnvApiEnum.token]?: string;
  [EnvApiEnum.baseUrl]?: string;

  [EnvRunEnum.id]?: number;
  [EnvRunEnum.title]?: string;
  [EnvRunEnum.description]?: string;
  [EnvRunEnum.complete]?: boolean;
  [EnvRunEnum.branch]?: string;

  [EnvBatchEnum.size]?: number;

  [EnvConfigurationsEnum.values]?: string;

  [EnvLocalEnum.path]?: string;
  [EnvLocalEnum.format]?: `${FormatEnum}`;

  [EnvLoggingEnum.console]?: boolean;
  [EnvLoggingEnum.file]?: boolean;
}
