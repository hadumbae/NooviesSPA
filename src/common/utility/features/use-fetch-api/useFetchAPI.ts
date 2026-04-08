/**
 * @file Core utility for performing standardized fetch requests with integrated parsing and error handling.
 * @filename useFetchAPI.ts
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";
import RequestMethod from "@/common/type/request/RequestMethod.ts";
import handleBadResponse from "@/common/utility/features/use-fetch-api/handleBadResponse.ts";
import parseJSON from "@/common/utility/features/use-fetch-api/parseJSON.ts";
import {executeFetch} from "@/common/utility/features/use-fetch-api/executeFetch.ts";

/**
 * Configuration parameters for the fetch operation.
 * @template TPayload - The shape of the data being sent to the server.
 */
type useFetchAPIParams<TPayload> = {
    /** The absolute or relative endpoint URL. */
    url: string;
    /** The HTTP verb (GET, POST, etc.). Defaults to "GET". */
    method?: RequestMethod;
    /** The body content, supporting both JSON objects and FormData for file uploads. */
    data?: TPayload;
    /** An AbortSignal to allow the caller to cancel the request (e.g., on component unmount). */
    signal?: AbortSignal;
};

/**
 * Standardized asynchronous wrapper for the native Fetch API.
 * ---
 * @template TReturns - Expected structure of the successful JSON response.
 * @template TPayload - Structure of the data sent in the request body.
 * @param params - Configuration including URL, method, payload, and signal.
 * @returns {Promise<RequestReturns<TReturns>>} A promise containing the parsed result.
 */
export default async function useFetchAPI<TReturns = unknown, TPayload = unknown>(
    {url, data, signal, method = "GET"}: useFetchAPIParams<TPayload>
): Promise<RequestReturns<TReturns>> {
    // --- SETUP ---

    const funcName = useFetchAPI.name;

    const isFormData = typeof FormData !== "undefined" && data instanceof FormData;

    const headers: HeadersInit = isFormData
        ? {}
        : {"Content-Type": "application/json"};

    const body: BodyInit | undefined = data
        ? (isFormData ? (data as FormData) : JSON.stringify(data))
        : undefined;

    // --- EXECUTE ---

    const response: Response = await executeFetch({
        source: funcName,
        url,
        method,
        headers,
        body,
        signal,
    });

    const raw = await response.text();

    if (!response.ok) {
        handleBadResponse({response, source: funcName, rawPayload: raw});
    }

    const result = parseJSON<TReturns>({
        raw,
        source: funcName,
        statusCode: response.status,
        url
    });

    return {
        result,
    };
}