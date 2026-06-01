/**
 * @fileoverview Mutation hook for deleting a movie review belonging to the current user.
 *
 */
import {OnDeleteMutationParams} from "@/common/type/form/MutationDeleteParams.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {
    deleteRemoveMovieReviewForCurrentUser
} from "@/domains/movieReviews/_feat/my-reviews/repository/repository.ts";
import {toast} from "react-toastify";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {FetchByMovieQueryKeys, MovieReviewCRUDQueryKeys, MyReviewsMutationKeys} from "@/domains/movieReviews/_feat";

/** Parameters for the movie review deletion mutation. */
type MutateParams = {
    reviewID: ObjectId;
    movieID?: ObjectId;
}

/** Mutation hook for deleting a MovieReview owned by the current user. */
export function useDeleteCurrentUserMovieReviewMutation(
    {onDeleteSuccess, successMessage, onDeleteError, errorMessage}: OnDeleteMutationParams = {}
): UseMutationResult<void, unknown, MutateParams> {
    const invalidateQueries = useInvalidateQueryKeys();

    const deleteMovieReview = async (params: MutateParams) => {
        await deleteRemoveMovieReviewForCurrentUser(params.reviewID);
    }

    const onSuccess = () => {
        invalidateQueries([
            MovieReviewCRUDQueryKeys.list(),
            FetchByMovieQueryKeys.all,
        ], {exact: false});

        successMessage && toast.success(successMessage);
        onDeleteSuccess?.();
    }

    const onError = (error: unknown) => {
        errorMessage && toast.error(errorMessage);
        handleMutationResponseError({error});
        onDeleteError?.(error);
    }

    return useMutation({
        mutationKey: MyReviewsMutationKeys.destroy(),
        mutationFn: deleteMovieReview,
        onSuccess,
        onError,
    });
}