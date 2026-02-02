/**
 * @file parseJSON.ts
 *
 * Safe JSON parsing utility with structured logging and error escalation.
 *
 * Wraps `JSON.parse` to:
 * - Provide consistent logging context on failure
 * - Throw a domain-specific {@link JSONParseError}
 * - Preserve raw payload and optional status metadata
 */

import Logger from "@/common/utility/features/logger/Logger.ts";
import JSONParseError from "@/common/errors/JSONParseError.ts";
import buildContext from "@/common/utility/features/logger/buildLoggerContext.ts";

type ParseOrThrowParams = {
    /** Raw string expected to contain valid JSON */
    raw: string;

    /** Optional request URL associated with the JSON payload */
    url?: string;

    /** Optional HTTP or internal status code */
    statusCode?: number;

    /** Optional source identifier for logging context */
    source?: string;

    /** Optional custom error message for logging */
    message?: string;
};

/**
 * Parses a JSON string or throws a {@link JSONParseError}.
 *
 * @remarks
 * - Logs structured context on failure
 * - Does not swallow errors
 * - Intended for API and fetch-layer usage
 *
 * @param params - JSON parsing parameters
 * @returns Parsed JSON value
 * @throws {JSONParseError} When parsing fails
 *
 * @example
 * ```ts
 * const data = parseJSON({ raw: '{"foo":"bar"}' });
 * ```
 */
export default function parseJSON(params: ParseOrThrowParams): unknown {
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
