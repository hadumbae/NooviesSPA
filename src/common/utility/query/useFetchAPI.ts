import RequestReturns from "@/common/type/request/RequestReturns.ts";
import RequestMethod from "@/common/type/request/RequestMethod.ts";
import Logger from "@/common/utility/logger/Logger.ts";
import handleBadResponse from "@/common/utility/use-fetch-api/handleBadResponse.ts";
import parseJSON from "@/common/utility/use-fetch-api/parseJSON.ts";

/**
 * Parameters for `useFetchAPI`.
 *
 * @template TData - Type of the request payload (body data sent to the server).
 */
type useFetchAPIParams<TData> = {
    /** The URL to send the request to. */
    url: string;

    /** HTTP method to use for the request. Defaults to `"GET"`. */
    method?: RequestMethod;

    /** Optional payload data for the request. Can be JSON or FormData. */
    data?: TData;

    /** Optional `AbortSignal` to cancel the request. */
    signal?: AbortSignal;
};

/**
 * Performs a fetch request with JSON parsing, error handling, and optional development-mode logging.
 *
 * Logging behavior:
 * - Logs request details (`url`, `method`, `headers`, `body`) before the request.
 * - Logs fetch errors, HTTP errors, and JSON parsing errors.
 *
 * @template TData - Type of the request payload.
 * @template TReturns - Type of the expected response data.
 *
 * @param params - Configuration object including URL, method, data, and signal.
 * @returns A promise resolving to an object containing:
 *  - `response`: the original `Response` object.
 *  - `result`: the parsed JSON data of type `TReturns`.
 *
 * @throws {HttpResponseError} If the HTTP response status is not OK (`!response.ok`).
 * @throws {JSONParseError} If the response body cannot be parsed as JSON.
 * @throws {Error} If the fetch request itself fails (network error, aborted request, etc.).
 *
 * @example
 * ```ts
 * const { response, result } = await useFetchAPI<{ name: string }, { id: number }>({
 *   url: "/api/users",
 *   method: "POST",
 *   data: { name: "Alice" },
 * });
 * console.log(result.id);
 * ```
 */
export default async function useFetchAPI<TData = unknown, TReturns = unknown>(
    params: useFetchAPIParams<TData>
): Promise<RequestReturns<TReturns>> {
    const funcName = useFetchAPI.name;
    const {url, data, signal, method = "GET"} = params;

    // === Build Query Options

    const isFormData = typeof FormData !== "undefined" && data instanceof FormData;

    const headers: HeadersInit = isFormData ? {} : {"Content-Type": "application/json"};

    const body: BodyInit | undefined = data
        ? (isFormData ? (data as FormData) : JSON.stringify(data))
        : undefined;

    Logger.log({
        msg: "Fetching data: ",
        type: "FETCH",
        context: {funcName, url, method, headers, body},
    });

    // === Use Fetch Query ===

    let response: Response;
    try {
        response = await fetch(url, {credentials: "include", method, headers, body, signal});
    } catch (error: unknown) {
        error instanceof Error
            ? Logger.error({msg: "Fetch request failed.", type: "ERROR", context: {funcName}, error})
            : Logger.error({msg: "Fetch request failed.", type: "ERROR", context: {funcName, error}});

        throw error;
    }

    // === Handle Bad Response ===

    const raw = await response.text();
    if (!response.ok) {
        handleBadResponse({
            response,
            source: funcName,
            rawPayload: raw,
        });
    }

    // === Return Parsed JSON ====
    const result = parseJSON({
        raw,
        source: funcName,
        statusCode: response.status
    });

    return {
        response,
        result,
    };
}