export interface ErrorOptionsType {
  cause?: unknown;
}

export interface TidenErrorInterface extends Error {
  cause?: unknown;
}

/**
 * @class TidenError
 * @extends Error
 * @implements TidenErrorInterface
 */
export class TidenError extends Error implements TidenErrorInterface {
  /**
   * @type {unknown}
   */
  public override cause?: unknown;

  constructor(message?: string, options?: ErrorOptionsType) {
    super(message);

    this.cause = options?.cause;
  }
}
