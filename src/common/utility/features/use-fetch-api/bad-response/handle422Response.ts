/**
 * @file Specialized error handler for HTTP 422 (Unprocessable Entity) responses.
 * @filename handle422Response.ts
 */

import {ValidationErrorResponseSchema} from "@/common/schema/features/failed-response/ValidationErrorResponseSchema.ts";
import buildContext from "@/common/utility/features/logger/buildLoggerContext.ts";
import Logger from "@/common/utility/features/logger/Logger.ts";
import {FormValidationError} from "@/common/errors/FormValidationError.ts";
import {ZodIssue} from "zod";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

/**
 * Parameters for the 422 error handling logic.
 */
type HandleParams = {
    /** The target URL of the failed request. */
    url: string;

    /** The response headers received from the server. */
    headers: Headers;

    /** The raw, unvalidated response body (usually JSON). */
    payload: unknown;

    /** The numeric HTTP status code (expected to be 422). */
    status: number;

    /** The status message associated with the HTTP response (e.g., "Unprocessable Entity"). */
    statusText: string;

    /** An optional identifier for the calling component or service (for tracing). */
    source?: string;
};

/**
 * Intercepts 422 responses to transform server-side validation failures into domain-specific errors.
 * @param params - Contextual request and response data including HTTP metadata.
 * @throws {HttpResponseError} If the 422 payload is malformed or unexpected.
 * @throws {FormValidationError} The standard output for successfully parsed validation errors.
 */
export function handle422Response(
    {payload, source, url, status, statusText, headers}: HandleParams
): never {
    const {
        success: isFormError,
        data: {message, errors} = {},
    } = ValidationErrorResponseSchema.safeParse(payload);

    if (!isFormError) {
        throw new HttpResponseError({
            url,
            headers,
            status,
            message: "HTTP 422: Unprocessable Entity (Malformed Error Payload)",
            statusText,
            payload,
        });
    }

    Logger.warn({
        msg: "HTTP 422 : Validation Error",
        type: "ERROR",
        context: buildContext([
            {key: "message", value: message},
            {key: "source", value: source},
            {key: "errors", value: errors},
        ]),
    });

    throw new FormValidationError({
        message: "HTTP 422: Validation Failed",
        errors: errors as ZodIssue[],
    });
}