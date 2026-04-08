/**
 * @file Standardized envelope for API response data.
 * @filename RequestReturns.ts
 */

/**
 * Generic return type for HTTP fetch operations.
 * ---
 * @template TData - The expected type of the result data. Defaults to `unknown`.
 */
type RequestReturns<TData = unknown> = {
    /**
     * The parsed and typed result data from the response body.
     */
    result: TData;
};

export default RequestReturns;