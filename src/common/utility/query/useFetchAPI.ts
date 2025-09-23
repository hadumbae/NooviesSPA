import FetchReturns from "@/common/type/fetch/FetchReturns.ts";
import RequestMethod from "@/common/type/RequestMethod.ts";
import JSONParseError from "@/common/errors/JSONParseError.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import Logger from "@/common/utility/logger/Logger.ts";

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
): Promise<FetchReturns<TReturns>> {
    const funcName = useFetchAPI.name;
    const {url, data, signal, method = "GET"} = params;

    const isFormData = typeof FormData !== "undefined" && data instanceof FormData;

    const headers: HeadersInit = isFormData ? {} : {"Content-Type": "application/json"};

    const body: BodyInit | undefined = data
        ? isFormData
            ? (data as FormData)
            : JSON.stringify(data)
        : undefined;

    Logger.log({msg: "Fetching data: ", context: {funcName, url, method, headers, body}});

    let response: Response;
    try {
        response = await fetch(url, {credentials: "include", method, headers, body, signal});
    } catch (error: unknown) {
        error instanceof Error
            ? Logger.error({msg: "Fetch request failed.", context: {funcName}, error})
            : Logger.error({msg: "Fetch request failed.", context: {funcName, error}});

        throw error;
    }

    const raw = await response.text();
    if (!response.ok) {
        Logger.warn({msg: `HTTP ERROR: ${response.status}`, context: {funcName, response_text: raw}});
        throw new HttpResponseError({response, message: raw});
    }

    let result: TReturns;
    try {
        result = JSON.parse(raw) as TReturns;
    } catch (error: unknown) {
        Logger.error({msg: "Failed to parse JSON.", context: {funcName, response_text: raw}});
        throw new JSONParseError({raw, status: response.status});
    }

    return {response, result};
}