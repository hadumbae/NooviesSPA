/**
 * @file Legacy handler for fetch operations and basic error propagation.
 * @filename HandleFetchError.ts
 * * @deprecated This utility is redundant. Its error-handling responsibilities
 * (throwing HttpResponseError) have been consolidated into `useFetchAPI`,
 * and data unwrapping is now handled by `useQueryFnHandler`.
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";

/**
 * Parameters for the HandleFetchError utility.
 * ---
 */
type HandlerParams = {
    /** The asynchronous fetch operation to execute. */
    fetchQueryFn: () => Promise<RequestReturns>,
    /** * Optional custom error message.
     * @deprecated Consolidated into the `useQueryFnHandler` error configuration.
     */
    message?: string
}

/**
 * Executes a fetch function and unwraps the result into a RequestReturns envelope.
 * ---
 * ### Status: Redundant
 * Historically, this function was responsible for verifying `response.ok`
 * and throwing `HttpResponseError`. In the current architecture:
 * 1. **`useFetchAPI`** internalizes the check for `!response.ok` and throws immediately.
 * 2. **`useQueryFnHandler`** manages the extraction of data and the mapping of
 * user-friendly error messages for TanStack Query.
 * ---
 * @param params - Configuration containing the fetch action.
 * @returns {Promise<RequestReturns>} A promise resolving to the standard response envelope.
 */
const HandleFetchError = async (
    params: HandlerParams
): Promise<RequestReturns> => {
    const {fetchQueryFn} = params;

    /** * In the current stack, useFetchAPI is called within this fn.
     * useFetchAPI will have already thrown if the response was bad.
     */
    const {result} = await fetchQueryFn();

    return {
        result
    };
}

export default HandleFetchError;