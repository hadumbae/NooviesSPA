/**
 * @fileoverview TanStack Query mutation hook for toggling the public visibility of a movie review.
 */
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {ModerationMessageFormData, ModerationMessageFormValues} from "@/common/_feat/moderation/forms";
import {UseFormReturn} from "react-hook-form";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {patchToggleReviewPublicity} from "@/domains/movieReviews/_feat/admin-actions/repositories";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {toast} from "react-toastify";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {
    CustomerReviewActionMutationKeys
} from "@/domains/movieReviews/_feat/admin-actions/mutations/CustomerReviewActionMutationKeys.ts";
import {
    useReviewAdminActionSuccessHelper
} from "@/domains/movieReviews/_feat/admin-actions/mutations/useReviewAdminActionSuccessHelper.ts";
import {MovieReview, MovieReviewSchema} from "@/domains/movieReviews/schemas/model";

/** Configuration parameters for the Toggle Review Publicity mutation. */
type MutationParams = {
    reviewID: ObjectId;
    form: UseFormReturn<ModerationMessageFormValues, unknown, ModerationMessageFormData>;
    onSubmit?: MutationOnSubmitParams<MovieReview>;
}

/** Hook to handle the administrative action of flipping a review between Public and Private. */
export function useToggleReviewPublicityMutation(
    {reviewID, form, onSubmit = {}}: MutationParams
): UseMutationResult<MovieReview, unknown, ModerationMessageFormData> {
    const {successMessage, onSubmitSuccess, onSubmitError, errorMessage} = onSubmit;

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

    const onSuccess = useReviewAdminActionSuccessHelper({
        onSubmitSuccess,
        successMessage,
    });

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