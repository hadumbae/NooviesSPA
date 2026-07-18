/**
 * @fileoverview React Query mutation hook for creating or updating a MovieReview for the current user.
 */
import {ObjectId} from "@/common/_schemas";
import {UseFormReturn} from "react-hook-form";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {
    patchUpdateMovieReviewForCurrentUser,
    postCreateMovieReviewForCurrentUser
} from "@/domains/movie-reviews/_feat/my-reviews/repository/repository.ts";
import {validateData} from "@/common/_feat/validate-data/validateData.ts";
import {toast} from "react-toastify";
import {handleFormSubmitError} from "@/common/_feat/error-handling/handleFormSubmitError.ts";
import {MovieReview, MovieReviewSchema} from "@/domains/movie-reviews/_schema/model";
import {
    MovieReviewForm,
    MovieReviewFormValues
} from "@/domains/movie-reviews/_feat/submit-form/schema/MovieReviewFormSchema.ts";
import {MyReviewsMutationKeys} from "@/domains/movie-reviews/_feat";
import {MutationResponseConfig} from "@/common/_feat";

/** Parameters for invoking the submit MovieReview mutation. */
export type SubmitMutation = {
    editID?: ObjectId;
    onSubmitConfig?: MutationResponseConfig<MovieReview>;
    form: UseFormReturn<MovieReviewFormValues, unknown, MovieReviewForm>;
}

/** Mutation hook for creating or updating a MovieReview owned by the current user. */
export function useSubmitUserMovieReviewMutation(
    {form, onSubmitConfig = {}}: SubmitMutation,
): UseMutationResult<MovieReview, unknown, MovieReviewForm> {
    const {successMessage, onSubmitSuccess, errorMessage, onSubmitError} = onSubmitConfig;

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
        handleFormSubmitError({form, error});
        onSubmitError?.(error);
    }

    return useMutation({
        mutationKey: MyReviewsMutationKeys.submit(),
        mutationFn: submitReviewData,
        onSuccess,
        onError,
    });
}