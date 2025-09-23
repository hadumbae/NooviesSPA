import Logger from "@/common/utility/logger/Logger.ts";

/**
 * Additional metadata to attach to a log entry.
 *
 * Each key should be descriptive, and values can be of any type.
 * This is used to provide structured context for logs.
 */
export type LogContext = Record<string, unknown>;

/**
 * Structure of the data passed to logger methods.
 *
 * - `msg`: A human-readable message describing the log event.
 * - `context`: Optional structured metadata to enrich the log entry.
 * - `error`: Optional error object to include a stack trace and message.
 */
export type LogPayload = {
    /** Human-readable message to log. */
    msg: string;

    /** Optional structured context to enrich the log. */
    context?: LogContext;

    /** Optional error to include stack trace and message. */
    error?: Error;
};

/**
 * Represents the keys of the `Logger` object that correspond to logging functions.
 *
 * This type dynamically extracts only the keys whose values are functions,
 * producing a union of strings such as `"log" | "warn" | "debug" | "error"`.
 *
 * Example usage:
 * ```ts
 * const fnName: LoggerFunction = "warn"; // ✅ valid
 * Logger[fnName]({ msg: "Something happened" }); // ✅ Type-safe dynamic call
 *
 * const invalid: LoggerFunction = "foo"; // ❌ TypeScript error
 * ```
 */
export type LoggerFunction = {
    [K in keyof typeof Logger]: typeof Logger[K] extends (...args: any[]) => any ? K : never
}[keyof typeof Logger];
