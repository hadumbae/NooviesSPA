/**
 * @fileoverview Mutation hook for deleting a movie review belonging to the current user.
 *
 */
import {OnDeleteMutationParams} from "@/common/type/form/MutationDeleteParams.ts";
import {ObjectId} from "@/common/_schemas";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {deleteRemoveMovieReviewForCurrentUser} from "@/domains/movie-reviews/_feat/my-reviews/repository/repository.ts";
import {toast} from "react-toastify";
import {
    handleSubmitResponseError
} from "@/common/_feat/error-handling/handleSubmitResponseError.ts";
import {FetchByMovieQueryKeys, MovieReviewCRUDQueryKeys, MyReviewsMutationKeys} from "@/domains/movie-reviews/_feat";

/** Parameters for the movie review deletion mutation. */
type MutateParams = {
    reviewID: ObjectId;
    movieID?: ObjectId;
}

/** Mutation hook for deleting a MovieReview owned by the current user. */
export function useDeleteCurrentUserMovieReviewMutation(
    {onDeleteSuccess, successMessage, onDeleteError, errorMessage}: OnDeleteMutationParams = {}
): UseMutationResult<void, unknown, MutateParams> {
    const queryClient = useQueryClient();

    const deleteMovieReview = async (params: MutateParams) => {
        await deleteRemoveMovieReviewForCurrentUser(params.reviewID);
    }

    const onSuccess = () => {
        queryClient.invalidateQueries({queryKey: MovieReviewCRUDQueryKeys.list(), exact: true});
        queryClient.invalidateQueries({queryKey: FetchByMovieQueryKeys.all, exact: true});

        successMessage && toast.success(successMessage);
        onDeleteSuccess?.();
    }

    const onError = (error: unknown) => {
        errorMessage && toast.error(errorMessage);
        handleSubmitResponseError({error});
        onDeleteError?.(error);
    }

    return useMutation({
        mutationKey: MyReviewsMutationKeys.destroy(),
        mutationFn: deleteMovieReview,
        onSuccess,
        onError,
    });
}