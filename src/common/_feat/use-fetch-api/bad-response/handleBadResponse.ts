/**
 * @fileoverview Utility for handling and logging unsuccessful HTTP responses.
 */

import {Logger} from "@/common/_feat/logger/Logger.ts";
import {buildContext} from "@/common/_feat/logger-builders/buildLoggerContext.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {handle422Response} from "@/common/_feat/use-fetch-api/bad-response/handle422Response.ts";
import {parseJSON} from "@/common/_feat/use-fetch-api/json/parseJSON.ts";

type HandlerParams = {
    response: Response;
    rawPayload: string;
    source: string;
    message?: string;
};

/** Processes a failed HTTP response by logging the error and throwing an HttpResponseError. */
export function handleBadResponse(
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
        handle422Response({source, url, headers, status, statusText, payload});
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
