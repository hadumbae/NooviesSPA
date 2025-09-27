import Logger from "@/common/utility/logger/Logger.ts";

/**
 * Predefined categories for log entries.
 *
 * Use these to classify the type of event being logged.
 */
export type LogType =
/** General-purpose log entry. */
    "GENERAL" |
    /** Informational messages about normal operations. */
    "INFO" |
    /** Warnings that may require attention. */
    "WARNING" |
    /** Error messages indicating failures or exceptions. */
    "ERROR" |
    /** Logs related to network fetch operations. */
    "FETCH" |
    /** Logs related to data processing or state updates. */
    "DATA" |
    /** Logs related to navigation or page transitions. */
    "NAVIGATION";


/**
 * Additional metadata to attach to a log entry.
 *
 * Each key should be descriptive, and values can be of any type.
 * This is used to provide structured context for logs.
 *
 * @example
 * ```ts
 * const context: LogContext = {
 *   userId: "12345",
 *   page: "/dashboard",
 *   featureFlag: true
 * };
 * ```
 */
export type LogContext = Record<string, unknown>;

/**
 * Structure of the data passed to logger methods.
 *
 * @remarks
 * - `msg`: A human-readable message describing the log event.
 * - `context`: Optional structured metadata to enrich the log entry.
 * - `error`: Optional error object to include a stack trace and message.
 *
 * @example
 * ```ts
 * const payload: LogPayload = {
 *   type: "ERROR",
 *   msg: "Failed to fetch user data",
 *   context: { userId: "12345", retryCount: 3 },
 *   error: new Error("Network request failed")
 * };
 * ```
 */
export type LogPayload = {
    /** Optional type of the log entry. */
    type?: LogType;

    /** Human-readable message describing the event. */
    msg: string;

    /** Optional structured metadata to enrich the log. */
    context?: LogContext;

    /** Optional error object to include stack trace and message. */
    error?: Error;
};

/**
 * Represents the keys of the `Logger` object that correspond to logging functions.
 *
 * This type dynamically extracts only the keys whose values are functions,
 * producing a union of strings such as `"log" | "warn" | "debug" | "error"`.
 *
 * @remarks
 * - Enables type-safe dynamic calls to `Logger` methods.
 *
 * @example
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
