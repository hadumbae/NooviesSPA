/**
 * @fileoverview TanStack Query mutation hook for toggling the public visibility of a movie review.
 */
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {ModerationMessageFormData} from "@/common/_feat/moderation/forms";
import {validateData} from "@/common/_feat/validate-data/validateData.ts";
import {CustomerReviewActionMutationKeys} from "@/domains/movie-reviews/_feat/admin-actions/mutationKeys.ts";
import {MovieReview, MovieReviewSchema} from "@/domains/movie-reviews/_schema/model";
import {
    patchToggleReviewPublicity
} from "@/domains/movie-reviews/_feat/admin-actions/toggle-review-publicity/patchToggleReviewPublicity";
import {MovieReviewMutationConfig} from "@/domains/movie-reviews/_types";

/** Hook to handle the administrative action of flipping a review between Public and Private. */
export function useToggleReviewPublicityMutation(
    {reviewID}: MovieReviewMutationConfig
): UseMutationResult<MovieReview, unknown, ModerationMessageFormData> {
    const queryClient = useQueryClient();

    const togglePublicity = async (values: ModerationMessageFormData) => {
        const {result} = await patchToggleReviewPublicity({reviewID, data: values});

        const {success, data, error} = validateData({
            schema: MovieReviewSchema,
            data: result,
            message: "Failed to toggle review's publicity.",
        });

        if (!success) throw error;
        return data;
    }

    const onSuccess = () => {
        queryClient.invalidateQueries({queryKey: ["customer"], exact: false});
        queryClient.invalidateQueries({queryKey: ["movie_reviews"], exact: false});
    }

    return useMutation({
        mutationKey: CustomerReviewActionMutationKeys.publicity({reviewID}),
        mutationFn: togglePublicity,
        onSuccess,
    });
}