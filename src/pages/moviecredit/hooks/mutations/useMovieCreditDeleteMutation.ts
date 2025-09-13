import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import MovieCreditRepository from "@/pages/moviecredit/repositories/MovieCreditRepository.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {OnDeleteMutationParams} from "@/common/type/form/FormMutationResultParams.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import handleMutationResponseError from "@/common/utility/mutations/handleMutationResponseError.ts";

/**
 * A custom React hook that manages the deletion of a single movie credit
 * using **React Query's `useMutation`**.
 *
 * This hook handles:
 * - Executing the delete request through `MovieCreditRepository`.
 * - Providing toast notifications for success and error states.
 * - Invalidating relevant queries so cached movie credit data stays fresh.
 * - Calling user-provided callbacks on success, error, and settlement.
 *
 * @param params - Parameters for handling mutation events.
 * @param params.onDeleteSuccess - Optional callback executed after a successful deletion.
 * @param params.onDeleteError - Optional callback executed if the deletion fails.
 * @param params.successMessage - Optional custom message shown in a toast on success.
 * @param params.errorMessage - Optional custom message shown in a toast on error.
 *
 * @returns A React Query `useMutation` result object for deleting a movie credit.
 *
 * @example
 * ```tsx
 * const { mutate: deleteMovieCredit, isLoading } = useMovieCreditDeleteMutation({
 *   onDeleteSuccess: () => console.log("Deleted successfully!"),
 *   onDeleteError: (err) => console.error("Delete failed", err),
 *   successMessage: "Movie credit removed!",
 *   errorMessage: "Unable to delete movie credit."
 * });
 *
 * // Usage
 * deleteMovieCredit({ _id: someMovieCreditId });
 * ```
 */
export default function useMovieCreditDeleteMutation(params?: OnDeleteMutationParams) {
    const queryClient = useQueryClient();
    const {onDeleteSuccess, onDeleteError, successMessage, errorMessage} = params || {};

    const mutationKey = ["delete_single_movie_credit"];

    const deleteMovieCredit = async ({_id}: { _id: ObjectId }) => {
        await handleMutationResponse({
            action: () => MovieCreditRepository.delete({_id}),
            errorMessage: "Failed to delete movie credit. Please try again.",
        });
    }

    const onSuccess = async () => {
        toast.success(successMessage ?? "Deleted movie credit.");
        onDeleteSuccess?.();
    }

    const onError = (error: Error) => {
        const fallbackMessage = errorMessage ?? "Failed to delete movie credit. Please try again.";
        handleMutationResponseError({error, errorMessage: fallbackMessage});
        onDeleteError?.(error);
    }

    const onSettled = async () => {
        const queryKeys = [
            "fetch_all_movie_credits",
            "fetch_paginated_movie_credits",
        ];

        await Promise.all(
            queryKeys.map(key => queryClient.invalidateQueries({queryKey: [key], exact: false}))
        );
    }

    return useMutation({
        mutationKey,
        mutationFn: deleteMovieCredit,
        onSuccess,
        onError,
        onSettled,
    });
}