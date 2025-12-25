import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import MovieCreditRepository from "@/pages/moviecredit/repositories/MovieCreditRepository.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {OnDeleteMutationParams} from "@/common/type/form/MutationDeleteParams.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";

/**
 * Delete a movie credit.
 *
 * Handles toasts, callbacks,
 * and cache invalidation.
 */
export default function useMovieCreditDeleteMutation(
    params?: OnDeleteMutationParams
) {
    const queryClient = useQueryClient();
    const {onDeleteSuccess, onDeleteError, successMessage, errorMessage} = params || {};

    const mutationKey = ["delete_single_movie_credit"];

    const deleteMovieCredit = async ({_id}: { _id: ObjectId }) => {
        await handleMutationResponse({
            action: () => MovieCreditRepository.delete({_id}),
            errorMessage: "Failed to delete movie credit. Please try again.",
        });
    };

    const onSuccess = async () => {
        toast.success(successMessage ?? "Deleted movie credit.");
        onDeleteSuccess?.();

        await Promise.all(
            [
                "fetch_movie_credits_by_query",
                "fetch_paginated_movie_credits",
            ].map((queryKey) =>
                queryClient.invalidateQueries({queryKey: [queryKey], exact: false})
            )
        );
    };

    const onError = (error: Error) => {
        const fallbackMessage =
            errorMessage ?? "Failed to delete movie credit. Please try again.";

        handleMutationResponseError({error, displayMessage: fallbackMessage});
        onDeleteError?.(error);
    };

    return useMutation({
        mutationKey,
        mutationFn: deleteMovieCredit,
        onSuccess,
        onError,
    });
}
