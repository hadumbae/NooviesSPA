/**
 * @file executeFetch.ts
 *
 * Low-level fetch wrapper with centralized logging.
 *
 * Provides a thin abstraction over the Fetch API that:
 * - logs outgoing requests
 * - includes credentials by default
 * - logs and rethrows execution errors
 */

import Logger from "@/common/utility/features/logger/Logger.ts";
import RequestMethod from "@/common/type/request/RequestMethod.ts";

type FetchParams = {
    /** Absolute or relative request URL */
    url: string;

    /** HTTP request method */
    method: RequestMethod;

    /** Request headers */
    headers: HeadersInit;

    /** Optional request body */
    body?: BodyInit;

    /** Optional abort signal */
    signal?: AbortSignal | null;

    /** Optional source identifier for logging context */
    source?: string;
};

/**
 * Executes a fetch request with standardized logging and options.
 *
 * @remarks
 * - Logs request metadata before execution
 * - Always includes credentials
 * - Logs failures with contextual metadata
 * - Rethrows errors for upstream handling
 *
 * @param params - Fetch execution parameters
 * @returns Native Fetch API {@link Response}
 * @throws Propagates any fetch-related errors
 */
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
