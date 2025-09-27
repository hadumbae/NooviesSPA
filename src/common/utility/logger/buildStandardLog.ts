import {LoggerFunction, LogType} from "@/common/utility/logger/Logger.types.ts";
import Logger from "@/common/utility/logger/Logger.ts";
import filterEmptyAttributes from "@/common/utility/filterEmptyAttributes.ts";

/**
 * Parameters accepted by {@link buildStandardLog}.
 */
export type LogParams = {
    /** Optional category/type of the log entry. Defaults to `"GENERAL"`. */
    type?: LogType;

    /**
     * The logging level (e.g., `"log"`, `"info"`, `"warn"`, `"error"`).
     * Defaults to `"log"` if not provided.
     *
     * @remarks
     * Determines which Logger method is called.
     */
    level?: LoggerFunction;

    /** The main log message to be recorded. */
    msg: string;

    /**
     * Optional component name that triggered this log.
     *
     * @remarks
     * Useful for tracing the origin of logs in larger applications.
     */
    component?: string;

    /**
     * Additional structured metadata to include in the log context.
     *
     * @remarks
     * Empty values (`undefined` or `null`) are automatically filtered out.
     */
    context?: Record<string, unknown>;
};

/**
 * Builds and submits a standardized log entry to the global {@link Logger}.
 *
 * @remarks
 * - Automatically defaults `level` to `"log"` and `type` to `"GENERAL"` if not provided.
 * - Filters out empty attributes from the combined context.
 * - Merges `component` and any additional context into a single object for logging.
 *
 * @param params - The log parameters including message, level, component, and context.
 *
 * @example
 * ```ts
 * buildStandardLog({
 *   level: "info",
 *   msg: "User successfully logged in",
 *   component: "AuthService",
 *   context: { userId: "12345" }
 * });
 * // → Logger.info({
 * //      msg: "User successfully logged in",
 * //      type: "GENERAL",
 * //      context: { component: "AuthService", userId: "12345" }
 * //   });
 * ```
 */
export default function buildStandardLog(params: LogParams) {
    const {msg, type = "GENERAL", level = "log", component, context = {}} = params;

    Logger[level]({
        msg,
        type,
        context: filterEmptyAttributes({component, ...context}),
    });
}
