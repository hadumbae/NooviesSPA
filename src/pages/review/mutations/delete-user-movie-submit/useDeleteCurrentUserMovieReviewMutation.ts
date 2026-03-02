/**
 * @file React Query mutation for deleting a current-user MovieReview.
 * useDeleteCurrentUserMovieReviewMutation.ts
 */

import {OnDeleteMutationParams} from "@/common/type/form/MutationDeleteParams.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {
    deleteRemoveMovieReviewForCurrentUser
} from "@/pages/review/repositories/my-movie-review/MyMovieReviewRepository.ts";
import {toast} from "react-toastify";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";
import {MovieReviewQueryKeys} from "@/pages/review/utilities/query/MovieReviewQueryKeys.ts";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";

/**
 * Parameters for invoking the delete MovieReview mutation.
 */
type MutateParams = {
    reviewID: ObjectId;
    movieID?: ObjectId;
}

/**
 * Mutation hook for deleting a MovieReview owned by the current user.
 *
 * Provides optional success and error side-effect handlers.
 */
export function useDeleteCurrentUserMovieReviewMutation(
    {onDeleteSuccess, successMessage, onDeleteError, errorMessage}: OnDeleteMutationParams = {}
): UseMutationResult<MutateParams, unknown, MutateParams> {
    const invalidateQueries = useInvalidateQueryKeys();

    const deleteMovieReview = async (params: MutateParams) => {
        await deleteRemoveMovieReviewForCurrentUser(params.reviewID);
        return params;
    }

    const onSuccess = ({movieID}: MutateParams) => {
        invalidateQueries([
            MovieReviewQueryKeys.query(),
            MovieReviewQueryKeys.paginated(),
            MovieReviewQueryKeys.userList(),
            MovieReviewQueryKeys.movieList(movieID),
            MovieReviewQueryKeys.movieDetails(movieID),
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
        mutationKey: ["movie_reviews", "user", "delete"],
        mutationFn: deleteMovieReview,
        onSuccess,
        onError,
    });
}