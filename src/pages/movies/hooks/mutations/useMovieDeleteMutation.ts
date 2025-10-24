import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import MovieRepository from "@/pages/movies/repositories/MovieRepository.ts";

import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {OnDeleteMutationParams} from "@/common/type/form/MutationDeleteParams.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";

/**
 * React Query mutation hook for deleting a single movie record with query invalidation.
 *
 * This hook wraps the `MovieRepository.delete` API call with standardized
 * success, error, and settled handling:
 *
 * - Displays toast notifications for success and failure states.
 * - Executes optional callbacks provided in {@link OnDeleteMutationParams}.
 * - Invalidates any cached movie queries to ensure the UI stays up-to-date.
 * - Provides a `useMutation` instance for tracking mutation state.
 *
 * @param params - Optional configuration parameters for the delete mutation.
 * @param params.successMessage - Optional custom success toast message (defaults to `"Movie deleted."`).
 * @param params.onDeleteSuccess - Optional callback fired after successful deletion.
 * @param params.errorMessage - Optional custom error toast message (defaults to `"Oops. Something went wrong. Please try again."`).
 * @param params.onDeleteError - Optional callback fired if deletion fails.
 *
 * @returns A {@link import("@tanstack/react-query").UseMutationResult | UseMutationResult}
 * object from React Query, exposing methods and state for the delete mutation.
 *
 * @example
 * ```tsx
 * const deleteMovie = useMovieDeleteMutation({
 *   successMessage: "Successfully removed movie!",
 *   onDeleteSuccess: () => refetchMovies(),
 * });
 *
 * // Usage in a component:
 * deleteMovie.mutate({ _id: "abc123" });
 * ```
 */
export default function useMovieDeleteMutation(params?: OnDeleteMutationParams) {
    const queryClient = useQueryClient();
    const {onDeleteSuccess, successMessage, onDeleteError, errorMessage} = params || {};

    const mutationKey = ["delete_single_movie"];

    /**
     * Executes the movie deletion API call.
     *
     * @param _id - The unique identifier of the movie to delete.
     */
    const mutationFn = async ({_id}: { _id: ObjectId }) => {
        await handleMutationResponse({
            action: () => MovieRepository.delete({_id}),
            errorMessage: "Failed to delete movie. Please try again.",
        });
    };

    /**
     * Callback fired on successful deletion.
     * Shows a toast and triggers optional user callback.
     */
    const onSuccess = () => {
        toast.success(successMessage ?? "Movie deleted.");
        onDeleteSuccess?.();
    };

    /**
     * Callback fired when deletion fails.
     * Handles errors with a toast and triggers optional user callback.
     *
     * @param error - The error thrown during deletion.
     */
    const onError = (error: unknown) => {
        const fallbackMessage = errorMessage ?? "Oops. Something went wrong. Please try again.";
        handleMutationResponseError({error, displayMessage: fallbackMessage});
        onDeleteError?.(error);
    };

    /**
     * Callback fired when the mutation is either successful or errored.
     * Invalidates movie queries to refresh the list.
     */
    const onSettled = async () => {
        await queryClient.invalidateQueries({
            queryKey: ["fetch_movies_by_query"],
            exact: false,
        });
    };

    return useMutation({
        mutationKey,
        mutationFn,
        onSuccess,
        onError,
        onSettled,
    });
}