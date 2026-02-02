/**
 * @file handle422Response.ts
 *
 * Specialized handler for HTTP 422 validation error responses.
 *
 * Responsibilities:
 * - Enforce schema integrity of validation error payloads
 * - Emit structured logs for diagnostics and audit
 * - Throw a domain-level `FormValidationError`
 *
 * This function never returns.
 */

import {ValidationErrorResponseSchema} from "@/common/schema/features/failed-response/ValidationErrorResponseSchema.ts";
import buildContext from "@/common/utility/features/logger/buildLoggerContext.ts";
import Logger from "@/common/utility/features/logger/Logger.ts";
import {FormValidationError} from "@/common/errors/FormValidationError.ts";
import {ZodIssue} from "zod";

type HandleParams = {
    /** Parsed response payload */
    payload: unknown;

    /** Optional request origin identifier */
    source?: string;
};

/**
 * Processes an HTTP 422 validation response by validating the payload
 * and escalating it as a domain-specific form error.
 *
 * Invalid payloads indicate a contract violation and are treated as
 * unrecoverable errors.
 *
 * @param params - Validation error handling input
 *
 * @throws {Error}
 * When the payload does not conform to the expected validation schema
 *
 * @throws {FormValidationError}
 * Always thrown for valid 422 validation responses
 */
export function handle422Response(
    {payload, source}: HandleParams
): never {
    const {
        success,
        data: {message, errors} = {},
    } = ValidationErrorResponseSchema.safeParse(payload);

    if (!success) {
        throw new Error("Invalid 422 Error Response. Failed to validate response.");
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
