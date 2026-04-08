/**
 * @file Safe JSON parsing utility with structured logging and error escalation.
 * @filename parseJSON.ts
 */

import Logger from "@/common/utility/features/logger/Logger.ts";
import JSONParseError from "@/common/errors/JSONParseError.ts";
import buildContext from "@/common/utility/features/logger/buildLoggerContext.ts";

/**
 * Configuration for the JSON parsing operation.
 */
type ParseOrThrowParams = {
    /** Raw string expected to contain valid JSON. */
    raw: string;

    /** Optional request URL associated with the JSON payload. */
    url?: string;

    /** Optional HTTP or internal status code for error enrichment. */
    statusCode?: number;

    /** Optional source identifier (e.g., function name) for logging context. */
    source?: string;

    /** Optional custom error message to override the default log entry. */
    message?: string;
};

/**
 * Parses a JSON string and returns a typed object, or throws a domain-specific error.
 * ---
 * @param params - JSON parsing configuration and metadata.
 * @returns The parsed JavaScript object.
 * @throws {JSONParseError} If the string is not valid JSON.
 */
export default function parseJSON<TData = unknown>(params: ParseOrThrowParams): TData {
    const {raw, statusCode, source, message, url} = params;

    try {
        return JSON.parse(raw);
    } catch {
        /** * Assemble granular context for debugging malformed API responses
         * or corrupted local storage strings.
         */
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