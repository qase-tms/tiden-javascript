import { AxiosError } from 'axios';
import { isAxiosError } from '../../utils/is-axios-error';
import { TidenError } from '../../utils/tiden-error';

export enum ApiErrorCode {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
  UNPROCESSABLE_ENTITY = 422,
}

interface ApiErrorResponse {
  errorMessage?: string;
  error?: string;
  message?: string;
}

export function processError(error: unknown, message: string, model?: object): TidenError {
  if (!isAxiosError(error)) {
    return new TidenError(message, { cause: error });
  }

  const err = error as AxiosError<ApiErrorResponse>;
  const errorData = err.response?.data;
  const status = err.response?.status;

  switch (status) {
    case ApiErrorCode.UNAUTHORIZED:
      return new TidenError(`${message}: Unauthorized. Please check your API token.`);
    case ApiErrorCode.FORBIDDEN:
      return new TidenError(`${message}: ${errorData?.errorMessage ?? 'Forbidden'}`);
    case ApiErrorCode.NOT_FOUND:
      return new TidenError(`${message}: Not found.`);
    case ApiErrorCode.BAD_REQUEST:
    case ApiErrorCode.UNPROCESSABLE_ENTITY:
      return new TidenError(
        `${message}: Bad request\n${JSON.stringify(errorData)}\nBody: ${JSON.stringify(model)}`,
      );
    default:
      return new TidenError(message, { cause: err });
  }
}

export function getErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const err = error as AxiosError<ApiErrorResponse>;
    const errorData = err.response?.data;
    return errorData?.errorMessage ?? errorData?.error ?? errorData?.message ?? 'Unknown API error';
  }
  return error instanceof Error ? error.message : 'Unknown error';
}
