/**
 * @fileoverview TanStack Query mutation hook for toggling the public visibility of a movie review.
 */
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {ModerationMessageFormData} from "@/common/_feat/moderation/forms";
import {patchToggleReviewPublicity} from "@/domains/movie-reviews/_feat/admin-actions/repositories";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {
    CustomerReviewActionMutationKeys
} from "@/domains/movie-reviews/_feat/admin-actions/mutations/CustomerReviewActionMutationKeys.ts";
import {MovieReview, MovieReviewSchema} from "@/domains/movie-reviews/_schema/model";

/** Configuration parameters for the Toggle Review Publicity mutation. */
type MutationParams = {
    reviewID: ObjectId;
}

/** Hook to handle the administrative action of flipping a review between Public and Private. */
export function useToggleReviewPublicityMutation(
    {reviewID}: MutationParams
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