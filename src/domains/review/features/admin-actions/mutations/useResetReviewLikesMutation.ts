/**
 * @file TanStack Query mutation hook for clearing 'helpful' likes from a movie review.
 * @filename useResetReviewLikesMutation.ts
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {ModerationMessageFormData} from "@/common/features/moderation/forms";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {MovieReview} from "@/domains/review/schemas/models/MovieReview.types.ts";
import {patchResetReviewLikes} from "@/domains/review/features/admin-actions/repositories";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {MovieReviewSchema} from "@/domains/review/schemas/models/MovieReview.schema.ts";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {
    CustomerReviewActionMutationKeys
} from "@/domains/review/features/admin-actions/mutations/CustomerReviewActionMutationKeys.ts";
import {toast} from "react-toastify";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {UseFormReturn} from "react-hook-form";

/**
 * Configuration parameters for the Reset Likes mutation.
 */
type MutationParams = {
    /** The ID of the review whose likes are being cleared. */
    reviewID: ObjectId;
    /** The React Hook Form instance for error mapping and state management. */
    form: UseFormReturn<ModerationMessageFormData>;
    /** Optional callbacks and custom messaging for the mutation lifecycle. */
    onSubmit: MutationOnSubmitParams<MovieReview>;
}

/**
 * Hook to handle the administrative action of resetting a review's engagement metrics.
 * ---
 * @param params - Configuration including review context and form instance.
 * @returns {UseMutationResult} The TanStack mutation object.
 */
export function useResetReviewLikesMutation(
    params: MutationParams
): UseMutationResult<MovieReview, unknown, ModerationMessageFormData> {
    const {reviewID, form, onSubmit} = params;
    const {successMessage, onSubmitSuccess, onSubmitError, errorMessage} = onSubmit;

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

    const onSuccess = (review: MovieReview) => {
        if (successMessage) toast.success(successMessage);
        onSubmitSuccess?.(review);
    }

    const onError = (error: unknown) => {
        if (errorMessage) toast.error(errorMessage);
        handleMutationFormError({error, form});
        onSubmitError?.(error);
    }

    return useMutation({
        mutationKey: CustomerReviewActionMutationKeys.likes({reviewID}),
        mutationFn: resetLikes,
        onSuccess,
        onError,
    });
}