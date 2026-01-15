/**
 * @file useGenreDeleteMutation.ts
 *
 * React Query mutation hook for deleting a single `Genre` entity by ID.
 *
 * Responsibilities:
 * - Execute delete requests via {@link GenreRepository}
 * - Handle standardized mutation success and error flows
 * - Invalidate relevant genre query caches
 * - Surface optional lifecycle callbacks and toast notifications
 */


import {useMutation, UseMutationResult} from "@tanstack/react-query";
import GenreRepository from "@/pages/genres/repositories/GenreRepository.ts";
import {toast} from "react-toastify";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import {OnDeleteMutationParams} from "@/common/type/form/MutationDeleteParams.ts";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {GenreQueryKeys} from "@/pages/genres/utilities/query/GenreQueryKeys.ts";

/**
 * Input payload for deleting a genre by ID.
 */
type DeleteByID = {
    /** Unique identifier of the genre to delete. */
    _id: ObjectId;
};


/**
 * Custom React Query hook for deleting a genre by its ID.
 *
 * This hook encapsulates mutation logic for deleting a single genre record.
 * It automatically handles success/error toasts, cache invalidation,
 * and optional external callbacks for success and error events.
 *
 * @param params - Configuration options controlling deletion behavior.
 *
 * @returns A {@link UseMutationResult} object exposing mutation utilities and state:
 * - `mutate({ _id })` — Triggers the deletion for the given genre ID.
 * - `isLoading`, `isError`, `isSuccess` — Track mutation status.
 * - `error` — Contains any thrown error from the mutation.
 *
 * @example
 * ```tsx
 * const mutation = useGenreDeleteMutation({
 *   successMessage: "Genre removed successfully.",
 *   onDeleteSuccess: () => console.log("Deleted!"),
 * });
 *
 * mutation.mutate({ _id: selectedGenreId });
 * ```
 *
 * @remarks
 * On successful deletion, this hook automatically invalidates:
 * - `"fetch_genres_by_query"` (non-exact match)
 */
export default function useGenreDeleteMutation(
    params: OnDeleteMutationParams
): UseMutationResult<void, unknown, DeleteByID> {
    const {onDeleteSuccess, onDeleteError, successMessage, errorMessage} = params;
    const invalidateData = useInvalidateQueryKeys();

    /**
     * Executes the delete API call for a given genre ID.
     *
     * @param _id - The unique identifier of the genre to delete.
     * @throws {Error} If the API request fails or returns an unexpected response.
     */
    const deleteGenre = async ({_id}: DeleteByID) => {
        await handleMutationResponse({
            action: () => GenreRepository.delete({_id}),
            errorMessage: "Failed to delete genre. Please try again.",
        });
    };

    /**
     * Callback triggered when the deletion succeeds.
     * Displays a toast message, invalidates cached genre lists,
     * and calls the optional `onDeleteSuccess` callback.
     */
    const onSuccess = async () => {
        await invalidateData([GenreQueryKeys.lists()], {exact: false});

        successMessage && toast.success(successMessage);
        onDeleteSuccess?.();
    };

    /**
     * Callback triggered when the deletion fails.
     * Displays an error toast and calls the optional `onDeleteError` callback.
     */
    const onError = (error: unknown) => {
        handleMutationResponseError({error, displayMessage: errorMessage});
        onDeleteError?.(error);
    };

    return useMutation({
        mutationKey: ["delete_single_genre"],
        mutationFn: deleteGenre,
        onSuccess,
        onError,
    });
}
