/**
 * @file Legacy handler for processing API query responses.
 * @filename handleQueryResponse.ts
 * * @deprecated This utility has been made redundant by the modern data-fetching
 * pipeline. Error throwing is now handled by `useFetchAPI`, and result unwrapping
 * is managed by `useQueryFnHandler`.
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";

/**
 * Parameters for {@link handleQueryResponse}.
 * ---
 * @template TReturns - The type of the successful response payload.
 */
type APIParams<TReturns = unknown> = {
    /**
     * The async function that performs the fetch or API request.
     * Must return a {@link RequestReturns} object.
     */
    action: () => Promise<RequestReturns<TReturns>>;

    /**
     * Optional custom error message.
     * @deprecated Use the configuration object in `useQueryFnHandler` instead.
     */
    errorMessage?: string;
};

/**
 * Handles the result of an API query by extracting the result from the request envelope.
 * ---
 * ### Status: Redundant
 * Historically, this function acted as the guard that invoked `throwResponseError`
 * if an API call failed. In the current architecture:
 * * 1. **Automated Error Escalation:** `useFetchAPI` now internally captures
 * `!response.ok` states and throws the appropriate `HttpResponseError` before
 * this handler is even reached.
 * 2. **Pipeline Consolidation:** `useQueryFnHandler` is now the preferred
 * wrapper for `useQuery` functions, as it handles both the extraction of `result`
 * and the application of standardized error messages.
 * ---
 * @template TReturns - Type of the successful response payload.
 * @param params - Configuration containing the API action.
 * @returns {Promise<TReturns>} The unwrapped result from the API request.
 */
export default async function handleQueryResponse<TReturns = unknown>(
    params: APIParams<TReturns>
): Promise<TReturns> {
    const {action} = params;
    const {result} = await action();
    return result;
}