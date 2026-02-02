import {ParseError} from "@/common/errors/ParseError.ts";
import {ZodIssue} from "zod";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

import {ValidationErrorResponseSchema} from "@/common/schema/features/failed-response/ValidationErrorResponseSchema.ts";

type ThrowParams = {
    /** The failed HTTP response (e.g., from fetch) */
    response: Response;

    /** Parsed response body (e.g., from response.json()) */
    result: unknown;

    /** Optional override message for the error */
    message?: string;
};

/**
 * Throws an appropriate error based on an HTTP response and its parsed body.
 *
 * - For 400 responses, attempts to parse a Zod-style error and throw a `ParseError`.
 * - For other non-OK responses, throws a generic `HttpResponseError`.
 * - Returns silently if the response is actually OK (defensive fail-safe).
 *
 * @throws {ParseError} If response is 400 and contains valid Zod error payload.
 * @throws {HttpResponseError} For other non-OK status codes.
 * @throws {Error} If the error payload is malformed or unexpected.
 */
export default function throwResponseError(params: ThrowParams): never | void {
    const {response, result, message} = params
    if (response.ok) return;

    if (response.status === 400) {
        const {success, data: parsedResult} = ValidationErrorResponseSchema.safeParse(result);

        if (!success) throw new Error("Invalid Error Response.");

        const {message: parsedMessage = "Bad Request", errors} = parsedResult;
        throw new ParseError({message: message ?? parsedMessage, errors: errors as ZodIssue[]});
    }

    throw new HttpResponseError({
        url: response.url,
        headers: response.headers,
        status: response.status,
        statusText: response.statusText,
        message,
    });
}