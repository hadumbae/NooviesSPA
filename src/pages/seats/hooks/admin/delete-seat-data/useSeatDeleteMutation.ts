import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import SeatRepository from "@/pages/seats/repositories/SeatRepository.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {OnDeleteMutationParams} from "@/common/type/form/MutationDeleteParams.ts";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";

/**
 * A custom hook for deleting a seat record using React Query.
 *
 * Features:
 * - Accepts optional success and error messages.
 * - Supports optional callbacks for success or error handling.
 * - Automatically invalidates related queries to keep the UI synchronized.
 *
 * @param params - Optional configuration object for messages and callbacks.
 * @returns A `UseMutationResult<void, unknown, {_id: ObjectId}>` from React Query.
 *
 * @example
 * ```ts
 * const deleteSeatMutation = useSeatDeleteMutation({
 *   successMessage: "Seat successfully deleted!",
 *   errorMessage: "Could not delete seat.",
 *   onDeleteSuccess: () => console.log("Seat deleted successfully."),
 *   onDeleteError: (error) => console.error(error),
 * });
 *
 * // Delete a seat by its ID:
 * deleteSeatMutation.mutate({ _id: "1234567890abcdef" });
 * ```
 */
export default function useSeatDeleteMutation(
    params: OnDeleteMutationParams = {}
): UseMutationResult<void, unknown, { _id: ObjectId }> {
    const {onDeleteSuccess, onDeleteError, successMessage, errorMessage} = params;

    const queryClient = useQueryClient();
    const mutationKey = ["delete_single_seat"];

    /**
     * Function to perform the deletion of a seat.
     *
     * @param args - Object containing the `_id` of the seat to delete.
     * @throws Throws an error if the deletion fails.
     */
    const mutationFn = async ({_id}: { _id: ObjectId }) => {
        await handleMutationResponse({
            action: () => SeatRepository.delete({_id}),
            errorMessage: "Failed to delete seat. Please try again.",
        });
    };

    /**
     * Called when the deletion succeeds.
     * Displays a toast notification and calls the optional success callback.
     */
    const onSuccess = () => {
        toast.success(successMessage ?? "Seat deleted.");
        onDeleteSuccess?.();
    };

    /**
     * Called when the deletion fails.
     * Handles the error with `handleMutationResponseError` and calls the optional error callback.
     *
     * @param error - The error thrown during deletion.
     */
    const onError = (error: unknown) => {
        const displayMessage = errorMessage ?? "Failed to delete seat. Please try again.";
        handleMutationResponseError({error, displayMessage});
        onDeleteError?.(error);
    };

    /**
     * Called after the mutation is settled (either success or error).
     * Invalidates related queries to refresh seat data in the UI.
     */
    const onSettled = async () => {
        const keys = ["fetch_seats_by_query", "fetch_screen_seats_by_row"];
        await Promise.all(
            keys.map((key) => queryClient.invalidateQueries({queryKey: [key], exact: false}))
        );
    };

    return useMutation({
        mutationKey,
        mutationFn,
        onSuccess,
        onError,
        onSettled,
    });
}
