import RequestReturns from "@/common/type/request/RequestReturns.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

import {ErrorResponseSchema} from "@/common/schema/features/failed-response/ErrorResponseSchema.ts";

type HandlerParams = { fetchQueryFn: () => Promise<RequestReturns>, message?: string }

/**
 * Executes a fetch function and handles HTTP errors by throwing an `HttpResponseError` if the response is not OK.
 *
 * @param {Object} params - The parameters for the function.
 * @param {() => Promise<RequestReturns>} params.fetchQueryFn - An asynchronous function that performs the fetch operation and returns a `FetchReturns` object.
 * @param {string} [params.message] - Optional custom error message to be used if the fetch response is not OK.
 *
 * @returns {Promise<RequestReturns>} A promise that resolves with the `FetchReturns` object if the fetch is successful.
 *
 * @throws {HttpResponseError} Throws an `HttpResponseError` if the HTTP response status is not OK (i.e., not in the range 200–299).
 */
const HandleFetchError = async (
    params: HandlerParams
): Promise<RequestReturns> => {
    const {message, fetchQueryFn} = params;
    const {response, result} = await fetchQueryFn();

    if (!response.ok) {
        let errorMessage = message ?? "Error. Please try again.";

        if (!message) {
            const {data, success} = ErrorResponseSchema.safeParse(result);
            if (success) errorMessage = data?.message;
        }

        throw new HttpResponseError({response, message: errorMessage});
    }

    return {
        response,
        result,
    };
}

export default HandleFetchError;