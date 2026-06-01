/**
 * @fileoverview TanStack Query mutation hook for manually overriding a movie review's star rating.
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {UseFormReturn} from "react-hook-form";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {patchSetReviewRating} from "@/domains/movieReviews/_feat/admin-actions/repositories";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {toast} from "react-toastify";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {
    CustomerReviewActionMutationKeys
} from "@/domains/movieReviews/_feat/admin-actions/mutations/CustomerReviewActionMutationKeys.ts";
import {SetReviewRatingFormData, SetReviewRatingFormValues} from "@/domains/movieReviews/_feat/admin-actions/forms";
import {
    useReviewAdminActionSuccessHelper
} from "@/domains/movieReviews/_feat/admin-actions/mutations/useReviewAdminActionSuccessHelper.ts";
import {MovieReview, MovieReviewSchema} from "@/domains/movieReviews/schemas/model";

/**
 * Configuration parameters for the Set Review Rating mutation. */
type MutationParams = {
    reviewID: ObjectId;
    form: UseFormReturn<SetReviewRatingFormValues, unknown, SetReviewRatingFormData>;
    onSubmit?: MutationOnSubmitParams<MovieReview>;
}

/** Hook to handle administrative star-rating overrides on movie reviews. */
export function useSetReviewRatingMutation(
    {reviewID, form, onSubmit = {}}: MutationParams
): UseMutationResult<MovieReview, unknown, SetReviewRatingFormData> {
    const {successMessage, onSubmitSuccess, onSubmitError, errorMessage} = onSubmit;

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
        mutationKey: CustomerReviewActionMutationKeys.rating({reviewID}),
        mutationFn: setRatings,
        onSuccess,
        onError,
    });
}