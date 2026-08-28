/**
 * @fileoverview TanStack Query mutation hook for manually overriding a movie review's star rating.
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {
    patchSetReviewRating
} from "@/domains/movie-reviews/_feat/admin-actions/set-review-rating/patchSetReviewRating.ts";
import {validateData} from "@/common/_feat/validate-data/validateData.ts";
import {CustomerReviewActionMutationKeys} from "@/domains/movie-reviews/_feat/admin-actions/mutationKeys.ts";
import {
    SetReviewRatingFormData
} from "@/domains/movie-reviews/_feat/admin-actions/set-review-rating/SetReviewRatingFormSchema.ts";
import {MovieReview, MovieReviewSchema} from "@/domains/movie-reviews/_schema/model";
import {MovieReviewMutationConfig} from "@/domains/movie-reviews/_types";

/** Hook to handle administrative star-rating overrides on movie reviews. */
export function useSetReviewRatingMutation(
    {reviewID}: MovieReviewMutationConfig
): UseMutationResult<MovieReview, unknown, SetReviewRatingFormData> {
    const queryClient = useQueryClient();

    const setRatings = async (values: SetReviewRatingFormData) => {
        const {result} = await patchSetReviewRating({reviewID, data: values});

        const {success, data, error} = validateData({
            schema: MovieReviewSchema,
            data: result,
            message: "Failed to set review's ratings.",
        });

        if (!success) throw error;
        return data;
    }

    const onSuccess = () => {
        queryClient.invalidateQueries({queryKey: ["customer"], exact: false});
        queryClient.invalidateQueries({queryKey: ["movie_reviews"], exact: false});
    }

    return useMutation({
        mutationKey: CustomerReviewActionMutationKeys.rating({reviewID}),
        mutationFn: setRatings,
        onSuccess,
    });
}