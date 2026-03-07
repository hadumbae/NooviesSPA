/**
 * @file React Query mutation for creating or updating a current-user MovieReview.
 * useSubmitUserMovieReviewMutation.ts
 */

import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {PopulatedMovieReview} from "@/pages/review/schemas/models/MovieReview.types.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {UseFormReturn} from "react-hook-form";
import {MovieReviewForm, MovieReviewFormValues} from "@/pages/review/schemas/forms/MovieReviewForm.types.ts";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import {
    patchUpdateMovieReviewForCurrentUser, postCreateMovieReviewForCurrentUser
} from "@/pages/review/repositories/my-movie-review/MyMovieReviewRepository.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {PopulatedMovieReviewSchema} from "@/pages/review/schemas/models/MovieReview.schema.ts";
import {toast} from "react-toastify";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {MovieReviewQueryKeys} from "@/pages/review/utilities/query/MovieReviewQueryKeys.ts";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";

/**
 * Parameters for invoking the submit MovieReview mutation.
 *
 * Enables create or update behaviour based on editID.
 */
type SubmitMutation = {
    editID?: ObjectId;
    onSubmit?: MutationOnSubmitParams<PopulatedMovieReview>;
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
): UseMutationResult<PopulatedMovieReview, unknown, MovieReviewForm> {
    const {editID, form, onSubmit} = params;
    const {successMessage, onSubmitSuccess, errorMessage, onSubmitError} = onSubmit ?? {};

    const invalidateQueries = useInvalidateQueryKeys();

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
            schema: PopulatedMovieReviewSchema,
        });

        if (!success) throw error;
        return parsedData;
    }

    const onSuccess = (review: PopulatedMovieReview) => {
        const {movie: {_id: movieID}} = review;

        invalidateQueries([
            MovieReviewQueryKeys.query(),
            MovieReviewQueryKeys.paginated(),
            MovieReviewQueryKeys.userList(),
            MovieReviewQueryKeys.movieList(movieID),
            MovieReviewQueryKeys.movieDetails(movieID),
            MovieReviewQueryKeys.featuredReviews(movieID),
        ]);

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