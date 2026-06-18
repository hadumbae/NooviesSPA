/**
 * @fileoverview TanStack Query mutation hook for manually overriding a movie review's star rating.
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {patchSetReviewRating} from "@/domains/movieReviews/_feat/admin-actions/repositories";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {
    CustomerReviewActionMutationKeys
} from "@/domains/movieReviews/_feat/admin-actions/mutations/CustomerReviewActionMutationKeys.ts";
import {SetReviewRatingFormData} from "@/domains/movieReviews/_feat/admin-actions/forms";
import {MovieReview, MovieReviewSchema} from "@/domains/movieReviews/schemas/model";

/**
 * Configuration parameters for the Set Review Rating mutation. */
type MutationParams = {
    reviewID: ObjectId;
}

/** Hook to handle administrative star-rating overrides on movie reviews. */
export function useSetReviewRatingMutation(
    {reviewID}: MutationParams
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