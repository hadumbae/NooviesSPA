/**
 * @fileoverview Handler for HTTP 422 Unprocessable Entity responses that parses validation errors.
 */

import {ValidationErrorResponsePayloadSchema} from "@/common/_schemas";
import {buildContext} from "@/common/_feat/logger-builders/buildLoggerContext.ts";
import {Logger} from "@/common/_feat/logger/Logger.ts";
import {FormValidationError} from "@/common/errors/FormValidationError.ts";
import {ZodIssue} from "zod";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

type HandleParams = {
    url: string;
    headers: Headers;
    payload: unknown;
    status: number;
    statusText: string;
    source?: string;
};

/**
 * Validates the error payload and throws a FormValidationError containing specific field errors.
 */
export function handle422Response(
    {payload, source, url, status, statusText, headers}: HandleParams
): never {
    const {success: isFormError, data} = ValidationErrorResponsePayloadSchema.safeParse(payload);
    const {statusCode, errorCode, issue, errors} = data ?? {};

    if (!isFormError) {
        const message = "HTTP 422: Unprocessable Entity (Malformed Error Payload)";
        throw new HttpResponseError({url, headers, status, message, statusText, payload});
    }

    Logger.warn({
        msg: "HTTP 422 : Validation Error",
        type: "ERROR",
        context: buildContext([
            {key: "statusCode", value: statusCode},
            {key: "errorCode", value: errorCode},
            {key: "issue", value: issue},
            {key: "source", value: source},
            {key: "errors", value: errors},
        ]),
    });

    throw new FormValidationError({
        message: "HTTP 422: Validation Failed",
        errors: errors as ZodIssue[],
    });
}