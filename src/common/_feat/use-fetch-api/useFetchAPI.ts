/**
 * @fileoverview Utility for performing standardized fetch requests with integrated parsing and error handling.
 */

import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns.ts";
import {RequestMethod} from "@/common/_types/request/RequestMethod.ts";
import {handleBadResponse} from "@/common/_feat/use-fetch-api/bad-response";
import {parseJSON} from "@/common/_feat/use-fetch-api/json";
import {executeFetch} from "@/common/_feat/use-fetch-api/fetch";
import {clearLocalAuthUser} from "@/domains/auth/_feat/storage/clearLocalAuthUser.ts";
import {isRefreshEligible} from "@/domains/auth/_feat/user-refresh/isRefreshEligible.ts";
import {getUserAuthTokenRefreshPromise} from "@/domains/auth";

type useFetchAPIParams<TPayload> = {
    url: string;
    method?: RequestMethod;
    data?: TPayload;
    signal?: AbortSignal;
};

/** Performs a standardized fetch request with automatic JSON parsing and error handling. */
export async function useFetchAPI<TReturns = unknown, TPayload = unknown>(
    {url, data, signal, method = "GET"}: useFetchAPIParams<TPayload>
): Promise<FetchRequestReturns<TReturns>> {
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

    const fetchConfig = {url, method, headers, body, signal};
    let response: Response = await executeFetch(fetchConfig);

    if (response.status === 401 && isRefreshEligible(url)) {
        let refreshed = false;

        try {
            await getUserAuthTokenRefreshPromise();
            refreshed = true;
        } catch (error: unknown) {
            clearLocalAuthUser();
        }

        if (refreshed) {
            response = await executeFetch(fetchConfig);
        }
    }

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