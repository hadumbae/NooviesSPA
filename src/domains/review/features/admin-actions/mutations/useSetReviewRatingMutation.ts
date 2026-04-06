/**
 * @file TanStack Query mutation hook for manually overriding a movie review's star rating.
 * @filename useSetReviewRatingMutation.ts
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {MovieReview} from "@/domains/review/schemas/models/MovieReview.types.ts";
import {UseFormReturn} from "react-hook-form";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {patchSetReviewRating} from "@/domains/review/features/admin-actions/repositories";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {MovieReviewSchema} from "@/domains/review/schemas/models/MovieReview.schema.ts";
import {toast} from "react-toastify";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {
    CustomerReviewActionMutationKeys
} from "@/domains/review/features/admin-actions/mutations/CustomerReviewActionMutationKeys.ts";
import {SetReviewRatingFormData} from "@/domains/review/features/admin-actions/forms";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {CustomerViewQueryKeys} from "@/domains/customers/features/profile-overview/fetch";

/**
 * Configuration parameters for the Set Review Rating mutation.
 */
type MutationParams = {
    /** The hex-string ID of the movie review to be updated. */
    reviewID: ObjectId;
    /** The React Hook Form instance for managing the rating-adjustment form state. */
    form: UseFormReturn<SetReviewRatingFormData>;
    /** Optional callbacks for post-submission logic and UI notifications. */
    onSubmit: MutationOnSubmitParams<MovieReview>;
}

/**
 * Hook to handle administrative star-rating overrides on movie reviews.
 * ---
 * @param params - Configuration including review context and form instance.
 * @returns {UseMutationResult} The TanStack mutation object for the rating-set action.
 */
export function useSetReviewRatingMutation(
    params: MutationParams
): UseMutationResult<MovieReview, unknown, SetReviewRatingFormData> {
    const {reviewID, form, onSubmit} = params;
    const {successMessage, onSubmitSuccess, onSubmitError, errorMessage} = onSubmit;

    const invalidateQueries = useInvalidateQueryKeys();

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
        mutationKey: CustomerReviewActionMutationKeys.rating({reviewID}),
        mutationFn: setRatings,
        onSuccess,
        onError,
    });
}