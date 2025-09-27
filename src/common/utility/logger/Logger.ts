import {LogPayload} from "@/common/utility/logger/Logger.types.ts";

/**
 * Indicates whether the app is running in development mode.
 *
 * Derived from the `VITE_DEV_MODE` environment variable.
 */
const isDev = import.meta.env.VITE_DEV_MODE === 'true';

/**
 * Indicates whether logs should always be written to the console,
 * regardless of environment.
 *
 * Derived from the `VITE_LOG_TO_CONSOLE` environment variable.
 */
const isLoggingToConsole = import.meta.env.VITE_LOG_TO_CONSOLE === 'true';

/**
 * Formats a log payload into a structured object suitable for console logging.
 *
 * @remarks
 * - Always includes a `time` property in ISO 8601 UTC format.
 * - Includes optional `context` metadata.
 * - Converts `error` to a plain object with `message` and `stack` fields.
 *
 * @param payload - The log payload containing optional `context`, `error`, and `type`.
 * @returns A structured object with `time`, optional `context`, `error`, and `type`.
 *
 * @example
 * ```ts
 * formatContext({
 *   type: "ERROR",
 *   msg: "Failed to fetch data",
 *   context: { userId: "123" },
 *   error: new Error("Network failure")
 * });
 * // {
 * //   type: "ERROR",
 * //   time: "2025-09-27T09:32:00.000Z",
 * //   context: { userId: "123" },
 * //   error: { message: "Network failure", stack: "..." }
 * // }
 * ```
 */
const formatContext = ({context, error, type = "GENERAL"}: LogPayload) => {
    return {
        type,
        time: new Date().toISOString(),
        context: context ?? {},
        error: error
            ? {message: error.message, stack: error.stack}
            : {message: null, stack: null},
    };
};

/**
 * A simple environment-aware logger.
 *
 * @remarks
 * - In development (`VITE_DEV_MODE=true`) or when `VITE_LOG_TO_CONSOLE=true`, logs all messages to the console.
 * - Error logs are always output regardless of environment.
 * - Supports structured logging with optional `context` and `error`.
 */
const Logger = {
    /**
     * Logs an informational message.
     *
     * @param payload - The log payload containing message, context, and/or error.
     *
     * @example
     * ```ts
     * Logger.log({ msg: "User logged in", context: { userId: "123" } });
     * ```
     */
    log: (payload: LogPayload) => {
        const {msg} = payload;
        if (isDev || isLoggingToConsole) console.log("[INFO]", msg, formatContext(payload));
    },

    /**
     * Logs a warning message.
     *
     * @param payload - The log payload containing message, context, and/or error.
     *
     * @example
     * ```ts
     * Logger.warn({ msg: "API response delayed", context: { endpoint: "/users" } });
     * ```
     */
    warn: (payload: LogPayload) => {
        const {msg} = payload;
        if (isDev || isLoggingToConsole) console.warn("[WARN]", msg, formatContext(payload));
    },

    /**
     * Logs a debug message.
     *
     * @param payload - The log payload containing message, context, and/or error.
     *
     * @example
     * ```ts
     * Logger.debug({ msg: "Component state updated", context: { component: "Dashboard" } });
     * ```
     */
    debug: (payload: LogPayload) => {
        const {msg} = payload;
        if (isDev || isLoggingToConsole) console.debug("[DEBUG]", msg, formatContext(payload));
    },

    /**
     * Logs an error message.
     *
     * @remarks
     * - Always outputs to console regardless of environment.
     *
     * @param payload - The log payload containing message, context, and/or error.
     *
     * @example
     * ```ts
     * Logger.error({
     *   msg: "Failed to fetch user data",
     *   context: { userId: "123" },
     *   error: new Error("Network request failed")
     * });
     * ```
     */
    error: (payload: LogPayload) => {
        const {msg} = payload;
        console.error("[ERROR]", msg, formatContext(payload));
    },
};

export default Logger;
