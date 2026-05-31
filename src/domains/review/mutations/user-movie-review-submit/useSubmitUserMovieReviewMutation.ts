/**
 * @file React Query mutation for creating or updating a current-user MovieReview.
 * useSubmitUserMovieReviewMutation.ts
 */

import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {UseFormReturn} from "react-hook-form";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import {
    patchUpdateMovieReviewForCurrentUser, postCreateMovieReviewForCurrentUser
} from "@/domains/review/repositories/my-movie-review/MyMovieReviewRepository.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {toast} from "react-toastify";
import {MovieReviewQueryKeys} from "@/domains/review/utilities/query/MovieReviewQueryKeys.ts";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {MovieReview, MovieReviewSchema} from "@/domains/review/schemas/model";
import {MovieReviewForm, MovieReviewFormValues} from "@/domains/review/_feat/submit-form/schema/MovieReviewFormSchema.ts";

/**
 * Parameters for invoking the submit MovieReview mutation.
 *
 * Enables create or update behaviour based on editID.
 */
type SubmitMutation = {
    editID?: ObjectId;
    onSubmit?: MutationOnSubmitParams<MovieReview>;
    form: UseFormReturn<MovieReviewFormValues>;
}

/**
 * Mutation hook for creating or updating a MovieReview
 * owned by the current user.
 *
 * Automatically validates response data and invalidates
 * related MovieReview query caches on success.
 */
export function useSubmitUserMovieReviewMutation(
    params: SubmitMutation,
): UseMutationResult<MovieReview, unknown, MovieReviewForm> {
    const {editID, form, onSubmit} = params;
    const {successMessage, onSubmitSuccess, errorMessage, onSubmitError} = onSubmit ?? {};

    const queryClient = useQueryClient();

    const submitReviewData = async (values: MovieReviewForm) => {
        const payload = {
            data: values,
            config: {populate: true, virtuals: true}
        };

        const action = editID
            ? () => patchUpdateMovieReviewForCurrentUser({reviewID: editID, ...payload})
            : () => postCreateMovieReviewForCurrentUser(payload);

        const returnData = await handleMutationResponse({
            action,
            errorMessage: "Failed to submit movie review data. Please try again.",
            rawData: values,
        });

        const {success, data: parsedData, error} = validateData({
            data: returnData,
            schema: MovieReviewSchema,
        });

        if (!success) throw error;
        return parsedData;
    }

    const onSuccess = (review: MovieReview) => {

        queryClient.invalidateQueries({
            queryKey: MovieReviewQueryKeys.all,
            exact: false,
        });

        successMessage && toast.success(successMessage);
        onSubmitSuccess?.(review);
    }

    const onError = (error: unknown) => {
        errorMessage && toast.error(errorMessage);
        handleMutationFormError({form, error});
        onSubmitError?.(error);
    }

    return useMutation({
        mutationKey: ["movie_reviews", "user", "submit"],
        mutationFn: submitReviewData,
        onSuccess,
        onError,
    });
}