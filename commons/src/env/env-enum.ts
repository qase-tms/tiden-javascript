/**
 * @enum {string}
 */
export enum EnvEnum {
  mode = 'TIDEN_MODE',
  fallback = 'TIDEN_FALLBACK',
  debug = 'TIDEN_DEBUG',
  environment = 'TIDEN_ENVIRONMENT',
  captureLogs = 'TIDEN_CAPTURE_LOGS',
  rootSuite = 'TIDEN_ROOT_SUITE',
  rootDir = 'TIDEN_ROOT_DIR',
  statusMapping = 'TIDEN_STATUS_MAPPING',
}

/**
 * @enum {string}
 */
export enum EnvTidenEnum {
  product = 'TIDEN_PRODUCT_ID',
  uploadAttachments = 'TIDEN_UPLOAD_ATTACHMENTS',
  defect = 'TIDEN_DEFECT',
  statusFilter = 'TIDEN_STATUS_FILTER',
}

/**
 * @enum {string}
 */
export enum EnvApiEnum {
  token = 'TIDEN_API_TOKEN',
  baseUrl = 'TIDEN_BASE_URL',
}

/**
 * @enum {string}
 */
export enum EnvRunEnum {
  id = 'TIDEN_RUN_ID',
  title = 'TIDEN_RUN_TITLE',
  description = 'TIDEN_RUN_DESCRIPTION',
  complete = 'TIDEN_RUN_COMPLETE',
  branch = 'TIDEN_BRANCH',
}

/**
 * @enum {string}
 */
export enum EnvBatchEnum {
  size = 'TIDEN_BATCH_SIZE',
}

/**
 * @enum {string}
 */
export enum EnvConfigurationsEnum {
  values = 'TIDEN_CONFIGURATIONS_VALUES',
}

/**
 * @enum {string}
 */
export enum EnvLocalEnum {
  path = 'TIDEN_REPORT_CONNECTION_PATH',
  format = 'TIDEN_REPORT_CONNECTION_FORMAT',
}

/**
 * @enum {string}
 */
export enum EnvLoggingEnum {
  console = 'TIDEN_LOGGING_CONSOLE',
  file = 'TIDEN_LOGGING_FILE',
}
