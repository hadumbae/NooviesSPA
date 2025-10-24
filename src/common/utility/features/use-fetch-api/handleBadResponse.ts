import Logger from "@/common/utility/features/logger/Logger.ts";
import buildContext from "@/common/utility/features/logger/buildLoggerContext.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {ParseErrorResponseSchema} from "@/common/schema/responses/ErrorResponse.schema.ts";
import {FormValidationError} from "@/common/errors/FormValidationError.ts";
import {ZodIssue} from "zod";
import parseJSON from "@/common/utility/features/use-fetch-api/parseJSON.ts";

type HandlerParams = {
    /** The original fetch Response object from an HTTP request */
    response: Response;

    /** Raw response payload as a string */
    rawPayload: string;

    /** Source identifier to trace where this response came from */
    source: string;
}

/**
 * Handles HTTP responses that indicate failure (non-2xx status codes).
 *
 * @description
 * This function processes "bad" HTTP responses and provides structured
 * error handling:
 *
 * - If the response has a 422 status code (validation error):
 *   - Attempts to parse the response JSON using `parseJSON`.
 *   - Validates the parsed object against `ParseErrorResponseSchema`.
 *   - Logs a warning with contextual information.
 *   - Throws a `FormValidationError` containing the validation issues.
 *
 * - For all other error status codes:
 *   - Logs a warning with the raw response and source.
 *   - Throws a generic `HttpResponseError`.
 *
 * @param params - Parameters required for handling the response
 * @throws {FormValidationError} When the response is HTTP 422 and validation fails
 * @throws {HttpResponseError} For all other HTTP error responses
 *
 * @example
 * ```ts
 * try {
 *   const response = await fetch("/api/resource");
 *   if (!response.ok) {
 *     const raw = await response.text();
 *     handleBadResponse({ response, rawPayload: raw, source: "fetchResource" });
 *   }
 * } catch (error) {
 *   console.error(error);
 * }
 * ```
 */
export default function handleBadResponse(params: HandlerParams) {
    const {response, source, rawPayload} = params;
    const {status: statusCode} = response;

    if (statusCode === 422) {
        // ⚡ Parse JSON ⚡
        const parsedJSON = parseJSON({
            source,
            statusCode,
            raw: rawPayload,
            errorMessage: "Failed to parse validation response."
        });

        // ⚡ Parse Response ⚡
        const {success, data} = ParseErrorResponseSchema.safeParse(parsedJSON);
        if (!success) throw new Error("Invalid 422 Error Response. Failed to validate response.");
        const {message, errors} = data;

        // ⚡ Log Error ⚡
        const context = buildContext([
            { key: "message", value: message },
            { key: "source", value: source },
            { key: "errors", value: errors },
        ]);

        Logger.warn({
            msg: `HTTP 422 : Validation Error`,
            type: "ERROR",
            context,
        });

        // ⚡ Throw Error ⚡
        throw new FormValidationError({
            message: "HTTP 422: Validation Failed",
            errors: errors as ZodIssue[],
            raw: rawPayload,
        });
    }

    // ⚡ Throw Standard Errors ⚡
    const context = buildContext([
        { key: "source", value: source },
        { key: "raw", value: rawPayload }
    ]);

    Logger.warn({ msg: `HTTP ERROR: ${response.status}`, type: "ERROR", context });

    throw new HttpResponseError({
        response,
        message: rawPayload,
    });
}
