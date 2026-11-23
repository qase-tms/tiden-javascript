/**
 * Thrown when "tiden" mode lacks a credential it needs (token, product or
 * base URL). Callers tell it apart from other startup failures so the
 * "reporter disabled" message can name the credentials only when they are
 * the cause.
 *
 * @class MissingCredentialsException
 * @extends Error
 */
export class MissingCredentialsException extends Error {}
