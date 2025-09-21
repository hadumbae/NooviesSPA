/**
 * Determines if the application is running in development mode.
 * @internal
 */
const isDev = import.meta.env.VITE_DEV_MODE === 'true';

/**
 * Determines if logging to console is enabled.
 * @internal
 */
const isLoggingToConsole = import.meta.env.VITE_LOG_TO_CONSOLE === 'true';

/**
 * A simple logger utility for logging messages to the console.
 *
 * Logging behavior:
 * - `log` and `warn` messages are printed only if `VITE_DEV_MODE` or `VITE_LOG_TO_CONSOLE` is set to `'true'`.
 * - `error` messages are always printed.
 *
 * Each message is prefixed with a log level indicator.
 */
const logger = {
    /**
     * Logs an informational message to the console.
     *
     * @param args - The values to log. Can be any type.
     *
     * @example
     * ```ts
     * logger.log("Server started on port", 3000);
     * ```
     */
    log: (...args: unknown[]) => {
        if (isDev || isLoggingToConsole) console.log("[INFO] ", ...args);
    },

    /**
     * Logs a warning message to the console.
     *
     * @param args - The values to log. Can be any type.
     *
     * @example
     * ```ts
     * logger.warn("Memory usage is high", memoryUsage);
     * ```
     */
    warn: (...args: unknown[]) => {
        if (isDev || isLoggingToConsole) console.warn("[WARN] ", ...args);
    },

    /**
     * Logs an error message to the console.
     *
     * @param args - The values to log. Can be any type.
     *
     * @example
     * ```ts
     * logger.error("Failed to connect to database", error);
     * ```
     */
    error: (...args: unknown[]) => {
        console.error("[ERROR] ", ...args);
    },
};

export default logger;
