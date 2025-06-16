import FetchReturns from "@/common/type/fetch/FetchReturns.ts";
import throwResponseError from "@/common/utility/errors/throwResponseError.ts";

/**
 * Parameters for the `handleAPIResponse` utility.
 *
 * @template TReturns - The expected shape of the successful result data.
 * @property action - A function that performs the API call and returns a `FetchReturns` object containing the raw response and the parsed result.
 * @property errorMessage - Optional custom error message to use if the response is not OK.
 */
type APIParams<TReturns = unknown> = {
    action: () => Promise<FetchReturns<TReturns>>;
    errorMessage?: string;
}

/**
 * Executes an API request and handles HTTP response validation.
 *
 * If the response status is not OK (`response.ok === false`), this function throws a structured HTTP error.
 * Otherwise, it returns the parsed result from the response.
 *
 * @template TReturns - The expected return type of the successful API result.
 * @param params - The API action and optional custom error message.
 * @returns The result data from the API response if the request was successful.
 * @throws An HTTP response error if the response status is not OK.
 *
 * @example
 * ```ts
 * const data = await handleAPIResponse({
 *   action: () => fetchUserById("123"),
 *   errorMessage: "Failed to load user data.",
 * });
 * ```
 */
export default async function handleAPIResponse<TReturns = unknown>(params: APIParams<TReturns>) {
    const {action, errorMessage} = params;

    const {response, result} = await action();

    if (!response.ok) {
        const message = errorMessage || "Failed to fetch data. Please try again.";
        throwResponseError({response, result, message});
    }

    return result;
}