import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import MovieCreditRepository from "@/pages/moviecredit/repositories/MovieCreditRepository.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {OnDeleteMutationParams} from "@/common/type/form/MutationDeleteParams.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";

/**
 * React Query mutation hook for deleting a movie credit.
 *
 * Provides built-in handling for:
 * - Executing the delete API call
 * - Displaying success/error toasts
 * - Triggering optional callbacks (`onDeleteSuccess`, `onDeleteError`)
 * - Invalidating cached queries for movie credits
 *
 * @param params - Optional configuration for success/error messages and callbacks.
 * @returns A React Query mutation object for deleting a movie credit.
 *
 * @example
 * ```tsx
 * const deleteMutation = useMovieCreditDeleteMutation({
 *   successMessage: "Movie credit deleted!",
 *   errorMessage: "Unable to delete credit.",
 *   onDeleteSuccess: () => console.log("Deleted successfully"),
 *   onDeleteError: (err) => console.error("Delete failed", err),
 * });
 *
 * deleteMutation.mutate({ _id: "abc123" });
 * ```
 */
export default function useMovieCreditDeleteMutation(params?: OnDeleteMutationParams) {
    const queryClient = useQueryClient();
    const {onDeleteSuccess, onDeleteError, successMessage, errorMessage} = params || {};

    const mutationKey = ["delete_single_movie_credit"];

    /**
     * Executes the delete request against the repository.
     *
     * @param _id - The unique identifier of the movie credit to delete.
     */
    const deleteMovieCredit = async ({_id}: { _id: ObjectId }) => {
        await handleMutationResponse({
            action: () => MovieCreditRepository.delete({_id}),
            errorMessage: "Failed to delete movie credit. Please try again.",
        });
    };

    /**
     * Success handler:
     * - Shows a success toast
     * - Fires the optional `onDeleteSuccess` callback
     */
    const onSuccess = async () => {
        toast.success(successMessage ?? "Deleted movie credit.");
        onDeleteSuccess?.();
    };

    /**
     * Error handler:
     * - Shows an error toast
     * - Fires the optional `onDeleteError` callback
     *
     * @param error - The error thrown during deletion.
     */
    const onError = (error: Error) => {
        const fallbackMessage = errorMessage ?? "Failed to delete movie credit. Please try again.";
        handleMutationResponseError({error, displayMessage: fallbackMessage});
        onDeleteError?.(error);
    };

    /**
     * Settled handler:
     * - Invalidates queries for movie credits to refresh the list
     */
    const onSettled = async () => {
        await queryClient.invalidateQueries({queryKey: ["fetch_movie_credits_by_query"], exact: false});
    };

    return useMutation({
        mutationKey,
        mutationFn: deleteMovieCredit,
        onSuccess,
        onError,
        onSettled,
    });
}
