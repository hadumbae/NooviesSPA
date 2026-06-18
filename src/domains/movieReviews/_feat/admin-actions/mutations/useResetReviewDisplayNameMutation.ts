/**
 * @fileoverview TanStack Query mutation hook for resetting or correcting a reviewer's display name.
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {patchResetReviewDisplayName} from "@/domains/movieReviews/_feat/admin-actions/repositories";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {ResetReviewDisplayNameFormData} from "@/domains/movieReviews/_feat/admin-actions/forms";
import {MovieReview, MovieReviewSchema} from "@/domains/movieReviews/schemas/model";
import {
    CustomerReviewActionMutationKeys
} from "@/domains/movieReviews/_feat/admin-actions/mutations/CustomerReviewActionMutationKeys.ts";

/** Configuration parameters for the Reset Display Name mutation. */
type MutationParams = {
    reviewID: ObjectId;
}

/**
 * Hook to handle administrative display name corrections on movie reviews via a patch request.
 */
export function useResetReviewDisplayNameMutation(
    {reviewID}: MutationParams
): UseMutationResult<MovieReview, unknown, ResetReviewDisplayNameFormData> {
    const queryClient = useQueryClient();

    const resetDisplayName = async (values: ResetReviewDisplayNameFormData) => {
        const {result} = await patchResetReviewDisplayName({reviewID, data: values});

        const {success, data, error} = validateData({
            schema: MovieReviewSchema,
            data: result,
            message: "Failed to reset review's display name.",
        });

        if (!success) throw error;
        return data;
    };

    const onSuccess = () => {
        queryClient.invalidateQueries({queryKey: ["customer"], exact: false});
        queryClient.invalidateQueries({queryKey: ["movie_reviews"], exact: false});
    }

    return useMutation({
        mutationKey: CustomerReviewActionMutationKeys.displayName({reviewID}),
        mutationFn: resetDisplayName,
        onSuccess,
    });
}