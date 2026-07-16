/**
 * @fileoverview Utility for performing standardized fetch requests with integrated parsing and error handling.
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";
import RequestMethod from "@/common/type/request/RequestMethod.ts";
import {handleBadResponse} from "@/common/_feat/use-fetch-api/bad-response";
import {parseJSON} from "@/common/_feat/use-fetch-api/json";
import {executeFetch} from "@/common/_feat/use-fetch-api/fetch";

type useFetchAPIParams<TPayload> = {
    url: string;
    method?: RequestMethod;
    data?: TPayload;
    signal?: AbortSignal;
};

/** Performs a standardized fetch request with automatic JSON parsing and error handling. */
export async function useFetchAPI<TReturns = unknown, TPayload = unknown>(
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