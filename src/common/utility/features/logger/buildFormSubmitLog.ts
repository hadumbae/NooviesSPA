import Logger from "@/common/utility/features/logger/Logger.ts";
import buildContext from "@/common/utility/features/logger/buildLoggerContext.ts";

/**
 * Parameters for {@link buildFormSubmitLog}.
 *
 * Represents the logging payload for form submissions, including the
 * message, logging level, component source, and the values submitted.
 */
export type LogParams = {
    /**
     * Message describing the form submission event.
     */
    msg: string;

    /**
     * Name of the component or source that triggered the log.
     */
    component?: string;

    /**
     * Key/value pairs from the form submission.
     * These are forwarded to the logger context for debugging and visibility.
     */
    values: Record<string, unknown>;
};

/**
 * `buildFormSubmitLog` logs structured form submission data to the global logger.
 *
 * This utility is intended to be used inside form submission handlers to
 * consistently log:
 * - The message describing the submission
 * - The component triggering the submission
 * - The full set of submitted form values
 *
 * The function constructs a logger context using `buildContext`, then delegates
 * the final structured log output to `Logger.log()`.
 *
 * @example
 * ```ts
 * buildFormSubmitLog({
 *   msg: "Submitting registration form",
 *   component: "RegisterForm",
 *   values: {
 *     email: "user@example.com",
 *     agreedToTerms: true,
 *   },
 * });
 * ```
 *
 * @param params - {@link LogParams} containing the message, component, and submitted values.
 */
export default function buildFormSubmitLog(params: LogParams) {
    const { msg, component, values } = params;

    const context = buildContext([
        { key: "component", value: component },
        { key: "values", value: values },
    ]);

    Logger.log({
        type: "DATA",
        msg,
        context,
    });
}
