/**
 * @file TanStack Query mutation hook for resetting or correcting a reviewer's display name.
 * @filename useResetReviewDisplayNameMutation.ts
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {MovieReview} from "@/domains/review/schemas/models/MovieReview.types.ts";
import {UseFormReturn} from "react-hook-form";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {patchResetReviewDisplayName} from "@/domains/review/features/admin-actions/repositories";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {MovieReviewSchema} from "@/domains/review/schemas/models/MovieReview.schema.ts";
import {toast} from "react-toastify";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {
    CustomerReviewActionMutationKeys
} from "@/domains/review/features/admin-actions/mutations/CustomerReviewActionMutationKeys.ts";
import {ResetReviewDisplayNameFormData} from "@/domains/review/features/admin-actions/forms";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {CustomerViewQueryKeys} from "@/domains/customers/features/profile-overview/fetch";

/**
 * Configuration parameters for the Reset Display Name mutation.
 */
type MutationParams = {
    /** The hex-string ID of the movie review being modified. */
    reviewID: ObjectId;
    /** The React Hook Form instance for managing the reset name form state. */
    form: UseFormReturn<ResetReviewDisplayNameFormData>;
    /** Optional callbacks for post-submission logic and UI notifications. */
    onSubmit: MutationOnSubmitParams<MovieReview>;
}

/**
 * Hook to handle administrative display name corrections on movie reviews.
 * ---
 * @param params - Configuration including review context and form instance.
 * @returns {UseMutationResult} The TanStack mutation object for the name-reset action.
 */
export function useResetReviewDisplayNameMutation(
    params: MutationParams
): UseMutationResult<MovieReview, unknown, ResetReviewDisplayNameFormData> {
    const {reviewID, form, onSubmit} = params;
    const {successMessage, onSubmitSuccess, onSubmitError, errorMessage} = onSubmit;

    const invalidateQueries = useInvalidateQueryKeys();

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

    const onSuccess = (review: MovieReview) => {
        invalidateQueries([
            CustomerViewQueryKeys.profile({})
        ], {exact: false});

        if (successMessage) toast.success(successMessage);
        onSubmitSuccess?.(review);
    };

    const onError = (error: unknown) => {
        if (errorMessage) toast.error(errorMessage);
        handleMutationFormError({error, form});
        onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: CustomerReviewActionMutationKeys.displayName({reviewID}),
        mutationFn: resetDisplayName,
        onSuccess,
        onError,
    });
}