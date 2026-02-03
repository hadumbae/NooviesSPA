/**
 * @file checkErrorType.ts
 *
 * Type guard utility for identifying query-related errors.
 *
 * Used to distinguish network and HTTP response failures from
 * other runtime or application errors, typically in React Query
 * error handling and error boundaries.
 */

import {NetworkError} from "@/common/errors/NetworkError.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

/**
 * Checks whether a value represents a query-related error.
 *
 * @param error - Unknown error value to test
 * @returns `true` if the error is a `NetworkError` or `HttpResponseError`
 */
export function isQueryError(error: unknown): boolean {
    return error instanceof NetworkError || error instanceof HttpResponseError;
}
