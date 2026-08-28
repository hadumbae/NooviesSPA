/**
 * @fileoverview TanStack Query mutation hook for resetting or correcting a reviewer's display name.
 */

import {validateData} from "@/common/_feat/validate-data/validateData.ts";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {MovieReview, MovieReviewSchema} from "@/domains/movie-reviews/_schema/model";
import {CustomerReviewActionMutationKeys} from "@/domains/movie-reviews/_feat/admin-actions/mutationKeys.ts";
import {
    patchResetReviewDisplayName
} from "@/domains/movie-reviews/_feat/admin-actions/reset-review-display-name/patchResetReviewDisplayName.ts";
import {
    ResetReviewDisplayNameFormData
} from "@/domains/movie-reviews/_feat/admin-actions/reset-review-display-name/ResetReviewDisplayNameFormSchema.ts";
import {MovieReviewMutationConfig} from "@/domains/movie-reviews/_types";

/**
 * Hook to handle administrative display name corrections on movie reviews via a patch request.
 */
export function useResetReviewDisplayNameMutation(
    {reviewID}: MovieReviewMutationConfig
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