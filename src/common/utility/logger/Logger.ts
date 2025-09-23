/**
 * Indicates whether the app is running in development mode.
 * Derived from `VITE_DEV_MODE` environment variable.
 */
const isDev = import.meta.env.VITE_DEV_MODE === 'true';

/**
 * Indicates whether logs should always be written to the console,
 * regardless of environment. Derived from `VITE_LOG_TO_CONSOLE`.
 */
const isLoggingToConsole = import.meta.env.VITE_LOG_TO_CONSOLE === 'true';

/**
 * Additional metadata to attach to a log entry.
 * Keys should be descriptive, and values may be of any type.
 */
type LogContext = Record<string, unknown>;

/**
 * Structure of the data passed to logger methods.
 */
type LogPayload = {
    /** Human-readable message to log. */
    msg: string;

    /** Optional structured context to enrich the log. */
    context?: LogContext;

    /** Optional error to include stack trace and message. */
    error?: Error;
};

/**
 * Formats a log payload into a structured object suitable for console logging.
 *
 * The returned object always includes a `time` property containing the current
 * UTC timestamp in ISO 8601 format. If provided, the payload's `context` and
 * `error` fields are also included.
 *
 * - `time` uses `Date.prototype.toISOString()`, ensuring a timezone-independent
 *   universal timestamp (UTC).
 * - `context` is attached under the `context` key if present.
 * - `error` is converted into a plain object with `message` and `stack` fields.
 *
 * @param payload - The log payload containing optional `context` and `error`.
 * @returns A structured object with `time`, optional `context`, and optional `error`.
 */
const formatContext = ({context, error}: LogPayload) => {
    return {
        time: (new Date()).toISOString(),
        context: context ?? {},
        error: error
            ? {message: error.message, stack: error.stack}
            : {message: null, stack: null},
    };
};

/**
 * A simple environment-aware logger.
 * - In development or when `VITE_LOG_TO_CONSOLE` is true,
 *   it logs all messages to the console.
 * - Error logs are always output regardless of environment.
 */
const Logger = {
    /**
     * Logs an informational message.
     *
     * @param payload - The log payload containing message, context, and/or error.
     */
    log: (payload: LogPayload) => {
        const {msg} = payload;
        if (isDev || isLoggingToConsole) console.log("[INFO]", msg, formatContext(payload));
    },

    /**
     * Logs a warning message.
     *
     * @param payload - The log payload containing message, context, and/or error.
     */
    warn: (payload: LogPayload) => {
        const {msg} = payload;
        if (isDev || isLoggingToConsole) console.warn("[WARN]", msg, formatContext(payload));
    },

    /**
     * Logs a debug message.
     *
     * @param payload - The log payload containing message, context, and/or error.
     */
    debug: (payload: LogPayload) => {
        const {msg} = payload;
        if (isDev || isLoggingToConsole) console.debug("[DEBUG]", msg, formatContext(payload));
    },

    /**
     * Logs an error message. Always outputs to console.
     *
     * @param payload - The log payload containing message, context, and/or error.
     */
    error: (payload: LogPayload) => {
        const {msg} = payload;
        console.error("[ERROR] ", msg, formatContext(payload));
    },
};

export default Logger;
