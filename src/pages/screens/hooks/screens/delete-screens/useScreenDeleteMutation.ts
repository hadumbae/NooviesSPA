import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import ScreenRepository from "@/pages/screens/repositories/ScreenRepository.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {OnDeleteMutationParams} from "@/common/type/form/MutationDeleteParams.ts";
import handleQueryResponse from "@/common/handlers/query/handleQueryResponse.ts";
import handleMutationResponseError from "@/common/utility/mutations/handleMutationResponseError.ts";

/**
 * Custom React hook for deleting a single screen entity.
 *
 * Wraps a React Query `useMutation` hook to:
 * - Delete a screen via `ScreenRepository`
 * - Show success or error toast messages
 * - Trigger optional success and error callbacks
 * - Invalidate cached queries after mutation
 *
 * @param params - Optional configuration for the deletion mutation
 * @param params.onDeleteSuccess - Callback fired when deletion succeeds
 * @param params.onDeleteError - Callback fired when deletion fails
 * @param params.successMessage - Optional message displayed on success
 * @param params.errorMessage - Optional message displayed on error
 *
 * @returns A React Query mutation object of type `UseMutationResult<void, unknown, {_id: ObjectId}>`
 *
 * @example
 * ```ts
 * const deleteMutation = useScreenDeleteMutation({
 *   onDeleteSuccess: () => console.log("Screen deleted"),
 *   onDeleteError: (err) => console.error(err),
 * });
 *
 * deleteMutation.mutate({ _id: "64f123abc1234567890abcdef" });
 * ```
 */
export default function useScreenDeleteMutation(
    params: OnDeleteMutationParams = {}
): UseMutationResult<void, unknown, { _id: ObjectId }> {
    const {onDeleteSuccess, onDeleteError, successMessage, errorMessage} = params;

    const mutationKey = ["delete_single_screen"];
    const queryClient = useQueryClient();

    /**
     * Executes the deletion of a screen by ID.
     *
     * @param _id - The unique identifier of the screen to delete
     */
    const mutationFn = async ({_id}: { _id: ObjectId }) => {
        await handleQueryResponse({
            action: () => ScreenRepository.delete({_id}),
            errorMessage: "Failed to delete screen data. Please try again.",
        });
    };

    /**
     * Called when the deletion succeeds.
     * Shows a success toast and calls optional success callback.
     */
    const onSuccess = async () => {
        toast.success(successMessage ?? "Screen deleted.");
        onDeleteSuccess?.();
    };

    /**
     * Called when the deletion fails.
     * Shows an error toast and calls optional error callback.
     *
     * @param error - The error thrown during deletion
     */
    const onError = (error: unknown) => {
        const displayMessage = errorMessage ?? "Something went wrong. Please try again.";
        handleMutationResponseError({error, displayMessage});
        onDeleteError?.(error);
    };

    /**
     * Called after the mutation settles (regardless of success or error).
     * Invalidates queries related to screen listings to keep cache consistent.
     */
    const onSettled = async () => {
        await queryClient.invalidateQueries({queryKey: ["fetch_screens_by_query"], exact: false});
    };

    return useMutation({
        mutationKey,
        mutationFn,
        onSuccess,
        onError,
        onSettled,
    });
}
