import {LoggerFunction} from "@/common/utility/logger/Logger.types.ts";
import Logger from "@/common/utility/logger/Logger.ts";
import filterEmptyAttributes from "@/common/utility/filterEmptyAttributes.ts";

/**
 * Parameters accepted by {@link buildStandardLog}.
 */
export type LogParams = {
    /**
     * The logging level (e.g., `"log"`, `"info"`, `"warn"`, `"error"`).
     * Defaults to `"log"` if not provided.
     */
    level?: LoggerFunction;

    /**
     * The main log message to be recorded.
     */
    msg: string;

    /**
     * Optional component name that triggered this log.
     * Useful for tracing log origin in larger applications.
     */
    component?: string;

    /**
     * Additional structured metadata to include in the log context.
     * Empty values are automatically filtered out.
     */
    context?: Record<string, unknown>;
};

/**
 * Builds and submits a standardized log entry to the global {@link Logger}.
 *
 * @remarks
 * - Automatically falls back to `level: "log"` if no level is provided.
 * - Filters out empty attributes (like `undefined` or `null`) from the context.
 * - Combines `component` and any custom `context` into the log payload.
 *
 * @param params - The log parameters, including message, level, component, and context.
 *
 * @example
 * ```ts
 * buildStandardLog({
 *   level: "info",
 *   message: "User successfully logged in",
 *   component: "AuthService",
 *   context: { userId: "12345" }
 * });
 * // → Logger.info({
 * //      msg: "User successfully logged in",
 * //      context: { component: "AuthService", userId: "12345" }
 * //   });
 * ```
 */
export default function buildStandardLog(params: LogParams) {
    const {msg, level = "log", component, context = {}} = params;

    Logger[level]({msg, context: filterEmptyAttributes({component, ...context})});
}
