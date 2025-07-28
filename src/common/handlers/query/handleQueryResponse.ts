import FetchReturns from "@/common/type/fetch/FetchReturns.ts";
import throwResponseError from "@/common/utility/errors/throwResponseError.ts";

/**
 * Parameters for {@link handleQueryResponse}.
 *
 * @template TReturns - The type of the successful response payload.
 */
type APIParams<TReturns = unknown> = {
    /**
     * The async function that performs the fetch or API request.
     * Must return a {@link FetchReturns} object containing:
     * - `response` - the raw `Response` object.
     * - `result` - the parsed response body.
     */
    action: () => Promise<FetchReturns<TReturns>>;

    /**
     * Optional custom error message to use if the response is not OK.
     * Defaults to `"Failed to fetch data. Please try again."`.
     */
    errorMessage?: string;
};

/**
 * Handles the result of an API query by:
 * - Executing the provided `action`.
 * - Throwing an `HttpResponseError` (via {@link throwResponseError}) if the response is not OK.
 * - Returning the parsed result on success.
 *
 * @template TReturns - Type of the successful response payload.
 *
 * @param params - {@link APIParams} containing the action and optional error message.
 *
 * @returns The parsed API response result.
 *
 * @throws {@link HttpResponseError} - If the HTTP response is not OK.
 * @throws {@link ParseError} - If the error response fails to parse.
 *
 * @example
 * ```ts
 * const userData = await handleQueryResponse({
 *   action: () => fetchUser(userId),
 *   errorMessage: "Unable to load user data."
 * });
 * ```
 */
export default async function handleQueryResponse<TReturns = unknown>(params: APIParams<TReturns>) {
    const {action, errorMessage} = params;

    const {response, result} = await action();

    if (!response.ok) {
        const message = errorMessage || "Failed to fetch data. Please try again.";
        throwResponseError({response, result, message});
    }

    return result;
}