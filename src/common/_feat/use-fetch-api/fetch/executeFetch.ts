/**
 * @fileoverview Utility for executing network requests with integrated logging and error handling.
 */

import {Logger} from "@/common/_feat/logger/Logger.ts";
import {RequestMethod} from "@/common/_types/request/RequestMethod.ts";

type FetchParams = {
    url: string;
    method: RequestMethod;
    headers: HeadersInit;
    body?: BodyInit;
    signal?: AbortSignal | null;
    source?: string;
};

/** Executes an HTTP request using the fetch API and logs the operation. */
export async function executeFetch(
    {url, method, headers, body, signal, source}: FetchParams
): Promise<Response> {
    Logger.log({
        msg: "Fetching data:",
        type: "FETCH",
        context: {source, url, method, headers, body},
    });

    try {
        return fetch(url, {credentials: "include", method, headers, body, signal});
    } catch (error: unknown) {
        error instanceof Error
            ? Logger.error({msg: "Fetch request failed.", type: "ERROR", context: {source}, error})
            : Logger.error({msg: "Fetch request failed.", type: "ERROR", context: {source, error}});

        throw error;
    }
}
