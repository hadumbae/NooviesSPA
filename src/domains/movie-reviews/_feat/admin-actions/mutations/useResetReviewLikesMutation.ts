/**
 * @fileoverview TanStack Query mutation hook for clearing helpful likes from a movie review.
 */

import {ObjectId} from "@/common/_schemas";
import {ModerationMessageFormData} from "@/common/_feat/moderation/forms";
import {patchResetReviewLikes} from "@/domains/movie-reviews/_feat/admin-actions/repositories";
import {validateData} from "@/common/_feat/validate-data/validateData.ts";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {
    CustomerReviewActionMutationKeys
} from "@/domains/movie-reviews/_feat/admin-actions/mutations/CustomerReviewActionMutationKeys.ts";
import {MovieReview, MovieReviewSchema} from "@/domains/movie-reviews/_schema/model";

/** Configuration parameters for the Reset Likes mutation. */
export type MutationParams = {
    reviewID: ObjectId;
}

/** Hook to handle the administrative action of resetting a review's engagement metrics. */
export function useResetReviewLikesMutation(
    {reviewID}: MutationParams
): UseMutationResult<MovieReview, unknown, ModerationMessageFormData> {
    const queryClient = useQueryClient();

    const resetLikes = async (values: ModerationMessageFormData) => {
        const {result} = await patchResetReviewLikes({reviewID, data: values});

        const {success, data, error} = validateData({
            schema: MovieReviewSchema,
            data: result,
            message: "Failed to reset review's likes.",
        });

        if (!success) throw error;
        return data;
    }

    const onSuccess = () => {
        queryClient.invalidateQueries({queryKey: ["customer"], exact: false});
        queryClient.invalidateQueries({queryKey: ["movie_reviews"], exact: false});
    }

    return useMutation({
        mutationKey: CustomerReviewActionMutationKeys.likes({reviewID}),
        mutationFn: resetLikes,
        onSuccess,
    });
}