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

/**
 * Parameters for invoking the delete MovieReview mutation.
 */
type MutateParams = {
    reviewID: ObjectId;
}

/**
 * Mutation hook for deleting a MovieReview owned by the current user.
 *
 * Provides optional success and error side-effect handlers.
 */
export function useDeleteCurrentUserMovieReviewMutation(
    {onDeleteSuccess, successMessage, onDeleteError, errorMessage}: OnDeleteMutationParams = {}
): UseMutationResult<void, unknown, MutateParams> {

    const deleteMovieReview = async (params: MutateParams) => {
        await deleteRemoveMovieReviewForCurrentUser(params.reviewID);
    }

    const onSuccess = () => {
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