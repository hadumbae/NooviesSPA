/**
 * @fileoverview React Query mutation hook for creating or updating a MovieReview for the current user.
 */
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {UseFormReturn} from "react-hook-form";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {
    patchUpdateMovieReviewForCurrentUser,
    postCreateMovieReviewForCurrentUser
} from "@/domains/movieReviews/_feat/my-reviews/repository/repository.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {toast} from "react-toastify";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {MovieReview, MovieReviewSchema} from "@/domains/movieReviews/schemas/model";
import {
    MovieReviewForm,
    MovieReviewFormValues
} from "@/domains/movieReviews/_feat/submit-form/schema/MovieReviewFormSchema.ts";
import {MyReviewsMutationKeys} from "@/domains/movieReviews/_feat";

/** Parameters for invoking the submit MovieReview mutation. */
export type SubmitMutation = {
    editID?: ObjectId;
    onSubmit?: MutationOnSubmitParams<MovieReview>;
    form: UseFormReturn<MovieReviewFormValues, unknown, MovieReviewForm>;
}

/** Mutation hook for creating or updating a MovieReview owned by the current user. */
export function useSubmitUserMovieReviewMutation(
    {form, onSubmit = {}}: SubmitMutation,
): UseMutationResult<MovieReview, unknown, MovieReviewForm> {
    const {successMessage, onSubmitSuccess, errorMessage, onSubmitError} = onSubmit;

    const queryClient = useQueryClient();

    const submitReviewData = async ({_id, ...values}: MovieReviewForm) => {
        const payload = {
            data: values,
            config: {populate: true, virtuals: true}
        };

        const action = _id
            ? () => patchUpdateMovieReviewForCurrentUser({reviewID: _id, ...payload})
            : () => postCreateMovieReviewForCurrentUser(payload);

        const {result} = await action();

        const {success, data: parsedData, error} = validateData({
            data: result,
            schema: MovieReviewSchema,
        });

        if (!success) throw error;
        return parsedData;
    }

    const onSuccess = (review: MovieReview) => {
        queryClient.invalidateQueries({
            queryKey: MyReviewsMutationKeys.all,
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
        mutationKey: MyReviewsMutationKeys.submit(),
        mutationFn: submitReviewData,
        onSuccess,
        onError,
    });
}