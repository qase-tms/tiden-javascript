import { JSONSchemaType } from 'env-schema';

import { EnvType } from './env-type';
import {
  EnvApiEnum, EnvBatchEnum,
  EnvEnum,
  EnvLocalEnum,
  EnvRunEnum,
  EnvTidenEnum,
  EnvConfigurationsEnum,
  EnvLoggingEnum,
} from './env-enum';

import { ModeEnum } from '../options';
import { FormatEnum } from '../writer';

/**
 * @type {JSONSchemaType<EnvType>}
 */
export const envValidationSchema: JSONSchemaType<EnvType> = {
  type: 'object',

  properties: {
    [EnvEnum.mode]: {
      type: 'string',
      enum: [ModeEnum.report, ModeEnum.tiden, ModeEnum.off],
      nullable: true,
    },
    [EnvEnum.fallback]: {
      type: 'string',
      enum: [ModeEnum.report, ModeEnum.tiden, ModeEnum.off],
      nullable: true,
    },
    [EnvEnum.debug]: {
      type: 'boolean',
      nullable: true,
    },
    [EnvEnum.environment]: {
      type: 'string',
      nullable: true,
    },
    [EnvEnum.captureLogs]: {
      type: 'boolean',
      nullable: true,
    },
    [EnvEnum.rootSuite]: {
      type: 'string',
      nullable: true,
    },
    [EnvEnum.statusMapping]: {
      type: 'string',
      nullable: true,
    },

    [EnvTidenEnum.product]: {
      type: 'string',
      nullable: true,
    },
    [EnvTidenEnum.uploadAttachments]: {
      type: 'boolean',
      nullable: true,
    },
    [EnvTidenEnum.defect]: {
      type: 'boolean',
      nullable: true,
    },
    [EnvTidenEnum.statusFilter]: {
      type: 'string',
      nullable: true,
    },

    [EnvApiEnum.token]: {
      type: 'string',
      nullable: true,
    },
    [EnvApiEnum.baseUrl]: {
      type: 'string',
      nullable: true,
    },

    [EnvRunEnum.id]: {
      type: 'number',
      nullable: true,
    },
    [EnvRunEnum.title]: {
      type: 'string',
      nullable: true,
    },
    [EnvRunEnum.description]: {
      type: 'string',
      nullable: true,
    },
    [EnvRunEnum.complete]: {
      type: 'boolean',
      nullable: true,
    },
    [EnvRunEnum.branch]: {
      type: 'string',
      nullable: true,
    },

    [EnvBatchEnum.size]: {
      type: 'number',
      nullable: true,
    },

    [EnvConfigurationsEnum.values]: {
      type: 'string',
      nullable: true,
    },

    [EnvLocalEnum.path]: {
      type: 'string',
      nullable: true,
    },
    [EnvLocalEnum.format]: {
      type: 'string',
      enum: [FormatEnum.json, FormatEnum.jsonp],
      nullable: true,
    },

    [EnvLoggingEnum.console]: {
      type: 'boolean',
      nullable: true,
    },
    [EnvLoggingEnum.file]: {
      type: 'boolean',
      nullable: true,
    },
  },
};
