/**
 * Default number of test results per upload batch.
 * Used by TestOpsReporter when no explicit batch size is configured.
 */
export const DEFAULT_BATCH_SIZE = 200;

/**
 * Upper bound on the configurable batch size — protects against
 * unreasonably large `tiden.batch.size` values overwhelming the
 * results:report endpoint in a single request.
 */
export const MAX_BATCH_SIZE = 2000;
