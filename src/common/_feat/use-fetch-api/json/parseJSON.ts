/**
 * @fileoverview Utility for parsing JSON strings with integrated error logging and custom error throwing.
 */

import {Logger} from "@/common/_feat/logger/Logger.ts";
import JSONParseError from "@/common/errors/JSONParseError.ts";
import {buildContext} from "@/common/_feat/logger-builders/buildLoggerContext.ts";

type ParseOrThrowParams = {
    raw: string;
    url?: string;
    statusCode?: number;
    source?: string;
    message?: string;
};

/** Parses a JSON string and logs an error with context if parsing fails. */
export function parseJSON<TData = unknown>(params: ParseOrThrowParams): TData {
    const {raw, statusCode, source, message, url} = params;

    try {
        return JSON.parse(raw);
    } catch {
        const context = buildContext([
            {key: "source", value: source},
            {key: "raw", value: raw},
            {key: "url", value: url},
        ]);

        Logger.error({
            msg: message ?? "Failed to parse JSON.",
            type: "ERROR",
            context,
        });

        throw new JSONParseError({raw, status: statusCode});
    }
}