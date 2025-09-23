import {ParseError} from "@/common/errors/ParseError.ts";
import {toast} from "react-toastify";
import Logger from "@/common/utility/logger/Logger.ts";
import buildContext from "@/common/utility/logger/buildLoggerContext.ts";

/**
 * Parameters for {@link handleMutationResponseError}.
 *
 * Used to pass the error object from a mutation or API call, along with an optional
 * user-facing error message override.
 */
type ErrorParams = {
    /**
     * The error instance or value thrown during the mutation or API operation.
     *
     * Can be:
     * - A {@link ParseError} instance (indicating validation failure).
     * - A standard {@link Error} instance (indicating runtime or operational error).
     * - Any other value (treated as an unknown error).
     */
    error: unknown;

    /**
     * Optional override for the toast notification message.
     *
     * If omitted:
     * - {@link ParseError} will use a default "Invalid data returned" message.
     * - Standard {@link Error} will use a default "Something went wrong" message.
     * - Unknown errors will use a generic fallback message.
     */
    displayMessage?: string;
};

/**
 * Handles and reports errors that occur during mutation operations such as API calls or data submissions.
 *
 * Behavior:
 * - If the error is a {@link ParseError}:
 *   - Displays a toast notification (or `displayMessage` if provided).
 *   - Logs detailed validation issues (`message` and `raw` data) to the console.
 * - If the error is a standard {@link Error}:
 *   - Displays a toast notification (or `displayMessage` if provided).
 *   - Logs the error object to the console.
 * - If the error is unknown:
 *   - Displays a generic toast notification.
 *   - Logs the unknown error object to the console.
 *
 * @param {ErrorParams} params - Parameters containing the error and optional custom message.
 * @param {unknown} params.error - The error instance or value to handle.
 * @param {string} [params.displayMessage] - Optional override for the toast notification.
 *
 * @remarks
 * - {@link ParseError} instances should contain `message`, `errors` (validation details), and `raw` (original data).
 * - Designed for client-side usage in mutation handlers, such as React Query `onError` callbacks.
 *
 * @example
 * ```ts
 * try {
 *   await createGenre(data);
 * } catch (error) {
 *   handleMutationResponseError({ error, displayMessage: "Failed to create genre." });
 * }
 * ```
 */
export default function handleMutationResponseError({error, displayMessage}: ErrorParams) {
    if (error instanceof ParseError) {
        const context = buildContext([
            {key: "message", value: displayMessage},
            {key: "raw", value: error.raw},
        ]);

        toast.error(displayMessage ?? "Invalid data returned. Please try again.");
        Logger.error({msg: "Failed To Validate Data", context, error});

        return;
    }

    if (error instanceof Error) {
        const context = buildContext([{key: "message", value: displayMessage}])

        toast.error(displayMessage ?? "Oops. Something went wrong. Please try again.");
        Logger.error({msg: "Error In Mutation:", error, context})
    } else {
        toast.error("An unknown error occurred. Please try again.");
        Logger.error({msg: "Unknown Error In Mutation", context: {error: error}});
    }
}
