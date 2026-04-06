/**
 * @file TanStack Query mutation hook for toggling the public visibility of a movie review.
 * @filename useToggleReviewPublicityMutation.ts
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {MovieReview} from "@/domains/review/schemas/models/MovieReview.types.ts";
import {ModerationMessageFormData} from "@/common/features/moderation/forms";
import {UseFormReturn} from "react-hook-form";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {patchToggleReviewPublicity} from "@/domains/review/features/admin-actions/repositories";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {MovieReviewSchema} from "@/domains/review/schemas/models/MovieReview.schema.ts";
import {toast} from "react-toastify";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {
    CustomerReviewActionMutationKeys
} from "@/domains/review/features/admin-actions/mutations/CustomerReviewActionMutationKeys.ts";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {CustomerViewQueryKeys} from "@/domains/customers/features/profile-overview/fetch";

/**
 * Configuration parameters for the Toggle Review Publicity mutation.
 */
type MutationParams = {
    /** The hex-string ID of the review whose visibility status is being changed. */
    reviewID: ObjectId;
    /** The React Hook Form instance for managing the moderation message state. */
    form: UseFormReturn<ModerationMessageFormData>;
    /** Optional callbacks for post-submission logic and UI notifications. */
    onSubmit: MutationOnSubmitParams<MovieReview>;
}

/**
 * Hook to handle the administrative action of flipping a review between 'Public' and 'Private'.
 * ---
 * @param params - Configuration including review context and form instance.
 * @returns {UseMutationResult} The TanStack mutation object.
 */
export function useToggleReviewPublicityMutation(
    params: MutationParams
): UseMutationResult<MovieReview, unknown, ModerationMessageFormData> {
    const {reviewID, form, onSubmit} = params;
    const {successMessage, onSubmitSuccess, onSubmitError, errorMessage} = onSubmit;

    const invalidateQueries = useInvalidateQueryKeys();

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

    const onSuccess = (review: MovieReview) => {
        invalidateQueries([
            CustomerViewQueryKeys.profile({})
        ], {exact: false});

        if (successMessage) toast.success(successMessage);
        onSubmitSuccess?.(review);
    }

    const onError = (error: unknown) => {
        if (errorMessage) toast.error(errorMessage);
        handleMutationFormError({error, form});
        onSubmitError?.(error);
    }

    return useMutation({
        mutationKey: CustomerReviewActionMutationKeys.publicity({reviewID}),
        mutationFn: togglePublicity,
        onSuccess,
        onError,
    });
}