import Logger from "@/common/utility/features/logger/Logger.ts";
import JSONParseError from "@/common/errors/JSONParseError.ts";
import buildContext from "@/common/utility/features/logger/buildLoggerContext.ts";

type ParseOrThrowParams = {
    /** The raw string expected to be valid JSON */
    raw: string;

    /** HTTP or internal status code associated with this JSON parsing attempt */
    statusCode: number;

    /** Optional custom error message to log if parsing fails */
    errorMessage?: string;

    /** Optional source identifier to help trace where the JSON originated */
    source?: string;
}

/**
 * Attempts to parse a JSON string into an object.
 *
 * @description
 * This function wraps `JSON.parse` and provides enhanced error handling:
 * - On success, it returns the parsed object.
 * - On failure, it logs an error with context and throws a `JSONParseError`.
 *
 * @param params - Parameters for parsing and error handling
 * @returns The parsed object if JSON is valid
 * @throws {JSONParseError} When the JSON string cannot be parsed
 *
 * @example
 * ```ts
 * const data = parseOrThrow({ raw: '{"foo": "bar"}', statusCode: 500 });
 * console.log(data.foo); // "bar"
 * ```
 */
export default function parseJSON(params: ParseOrThrowParams) {
    const {raw, statusCode, source, errorMessage} = params;

    try {
        return JSON.parse(raw);
    } catch (e) {
        const context = buildContext([
            { key: "source", value: source },
            { key: "raw", value: raw }
        ]);

        Logger.error({ msg: errorMessage ?? "Failed to parse JSON.", type: "ERROR", context });
        throw new JSONParseError({ raw, status: statusCode });
    }
}
