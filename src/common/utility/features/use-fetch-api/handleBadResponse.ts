/**
 * @file handleBadResponse.ts
 *
 * Centralized handler for non-OK HTTP fetch responses.
 *
 * Responsibilities:
 * - Parse and normalize failed response payloads
 * - Short-circuit validation failures (HTTP 422)
 * - Emit structured logs for observability
 * - Throw a normalized `HttpResponseError` for upstream consumers
 *
 * This function never returns.
 */

import Logger from "@/common/utility/features/logger/Logger.ts";
import buildContext from "@/common/utility/features/logger/buildLoggerContext.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {handle422Response} from "@/common/utility/features/use-fetch-api/bad-response/handle422Response.ts";
import parseJSON from "@/common/utility/features/use-fetch-api/parseJSON.ts";

type HandlerParams = {
    /** Fetch API Response object */
    response: Response;

    /** Raw response body as received from the server */
    rawPayload: string;

    /** Identifier describing the request origin */
    source: string;

    /** Optional override for the thrown error message */
    message?: string;
};

/**
 * Handles a failed HTTP response by normalizing payloads, logging context,
 * and throwing a domain-specific error.
 *
 * Validation errors (HTTP 422) are escalated immediately and do not fall
 * through to generic HTTP error handling.
 *
 * @param params - Failed response handling input
 *
 * @throws {FormValidationError}
 * When a 422 validation error response is encountered
 *
 * @throws {HttpResponseError}
 * For all other non-OK HTTP responses
 */
export default function handleBadResponse(
    {response, source, rawPayload, message}: HandlerParams
): never {
    const {url, headers, status, statusText} = response;

    const payload = parseJSON({
        url,
        raw: rawPayload,
        statusCode: status,
        source,
        message: "Invalid Response Body.",
    });

    if (status === 422) {
        handle422Response({source, payload});
    }

    Logger.warn({
        msg: `HTTP ERROR: ${status}`,
        type: "ERROR",
        context: buildContext([
            {key: "source", value: source},
            {key: "payload", value: payload},
        ]),
    });

    throw new HttpResponseError({
        url,
        headers,
        status,
        statusText,
        message,
        payload,
    });
}
