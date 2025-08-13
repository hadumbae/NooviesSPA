import {ParseError} from "@/common/errors/ParseError.ts";
import {toast} from "react-toastify";

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
     * This can be:
     * - A {@link ParseError} instance (indicating validation failure).
     * - A standard {@link Error} instance (indicating runtime or operational error).
     * - Any other value (treated as an unknown error).
     */
    error: unknown;

    /**
     * Optional override for the toast notification message.
     *
     * If not provided:
     * - {@link ParseError} will use its own `message` if available.
     * - Standard {@link Error} will use its `message` property.
     * - Otherwise, a generic fallback message will be used.
     */
    errorMessage?: string;
};

/**
 * Handles and reports errors that occur during mutation operations such as API calls or data submissions.
 *
 * This function:
 * - Detects if the error is a {@link ParseError} (validation error) and logs detailed validation issues.
 * - Detects if the error is a standard {@link Error} and logs the error message.
 * - Falls back to a generic message if the error is unknown.
 *
 * Notifications are displayed to the user using `react-toastify`.
 *
 * @param {ErrorParams} params - Parameters containing the error and optional custom message.
 * @param {unknown} params.error - The error instance or value to handle.
 * @param {string} [params.errorMessage] - Optional override for the toast message.
 *
 * @remarks
 * - {@link ParseError} instances should contain `message`, `errors` (validation details), and `raw` (original data).
 * - Logs additional debug information to the console for developers.
 * - Designed for client-side use in mutation handlers (e.g., React Query `onError` callbacks).
 *
 * @example
 * ```ts
 * try {
 *   await createGenre(data);
 * } catch (error) {
 *   handleMutationResponseError({ error, errorMessage: "Failed to create genre." });
 * }
 * ```
 */
export default function handleMutationResponseError({error, errorMessage}: ErrorParams) {
    if (error instanceof ParseError) {
        const {message, errors, raw} = error;
        toast.error(errorMessage ?? message ?? "Invalid data returned. Please try again.");

        console.group("ParseError Details");
        console.error("Validation Issues: ", errors);
        console.error("Raw Data: ", raw);
        console.groupEnd();

        return;
    }

    if (error instanceof Error) {
        const {message} = error;
        toast.error(errorMessage ?? message ?? "Oops. Something went wrong. Please try again.");
        console.log("Mutation Error: ", error);
    } else {
        toast.error("An unknown error occurred. Please try again.");
        console.error("Unknown Error: ", error);
    }

}