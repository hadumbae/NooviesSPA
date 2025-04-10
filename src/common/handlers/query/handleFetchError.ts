import FetchReturns from "@/common/type/fetch/FetchReturns.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

/**
 * Executes a fetch function and handles HTTP errors by throwing an `HttpResponseError` if the response is not OK.
 *
 * @param {Object} params - The parameters for the function.
 * @param {() => Promise<FetchReturns>} params.fetchQueryFn - An asynchronous function that performs the fetch operation and returns a `FetchReturns` object.
 * @param {string} [params.message] - Optional custom error message to be used if the fetch response is not OK.
 *
 * @returns {Promise<FetchReturns>} A promise that resolves with the `FetchReturns` object if the fetch is successful.
 *
 * @throws {HttpResponseError} Throws an `HttpResponseError` if the HTTP response status is not OK (i.e., not in the range 200–299).
 */
const HandleFetchError = async (
    {fetchQueryFn, message}: {fetchQueryFn: () => Promise<FetchReturns>, message?: string}
): Promise<FetchReturns> => {
    const {response, result} = await fetchQueryFn();

    if (!response.ok) {
        const {message: resultMessage = "Error. Please try again."} = result;
        throw new HttpResponseError({response, message: message || resultMessage});
    }

    return {
        response,
        result,
    };
}

export default HandleFetchError;