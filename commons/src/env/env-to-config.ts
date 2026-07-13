import { EnvType } from './env-type';
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

import { DriverEnum } from '../writer';
import { ConfigType } from '../config';
import { FormatEnum } from '../writer/driver-enum';

/**
 * @param {EnvType} env
 * @returns {ConfigType}
 */
export const envToConfig = (env: EnvType): ConfigType => ({
  mode: env[EnvEnum.mode],
  debug: env[EnvEnum.debug],
  environment: env[EnvEnum.environment],
  captureLogs: env[EnvEnum.captureLogs],
  rootSuite: env[EnvEnum.rootSuite],
  statusMapping: env[EnvEnum.statusMapping] ?
    Object.fromEntries(
      env[EnvEnum.statusMapping].split(',').map(item => {
        const [from, to] = item.split('=');
        return [from?.trim() || '', to?.trim() || ''];
      })
    ) : undefined,

  tiden: {
    product: env[EnvTidenEnum.product],
    uploadAttachments: env[EnvTidenEnum.uploadAttachments],
    statusFilter: env[EnvTidenEnum.statusFilter]?.split(',').map(status => status.trim()) ?? undefined,

    api: {
      token: env[EnvApiEnum.token],
      baseUrl: env[EnvApiEnum.baseUrl],
    },

    run: {
      id: env[EnvRunEnum.id],
      title: env[EnvRunEnum.title],
      description: env[EnvRunEnum.description],
      complete: env[EnvRunEnum.complete],
      branch: env[EnvRunEnum.branch],
    },

    batch: {
      size: env[EnvBatchEnum.size],
    },
    defect: env[EnvTidenEnum.defect],
    configurations: env[EnvConfigurationsEnum.values] ? {
      values: env[EnvConfigurationsEnum.values].split(',').map(item => {
        const [name, value] = item.split('=');
        return { name: (name ?? '').trim(), value: value ? value.trim() : '' };
      }),
    } : undefined,
  },

  report: {
    connections: {
      [DriverEnum.local]: {
        path: env[EnvLocalEnum.path],
        format: env[EnvLocalEnum.format] as FormatEnum | undefined,
      },
    },
  },

  logging: (env[EnvLoggingEnum.console] !== undefined || env[EnvLoggingEnum.file] !== undefined) ? {
    console: env[EnvLoggingEnum.console],
    file: env[EnvLoggingEnum.file],
  } : undefined,
});
