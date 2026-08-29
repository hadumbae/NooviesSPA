/**
 * @fileoverview React Query mutation hook for creating or updating a MovieReview for the current user.
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {validateData} from "@/common/_feat/validate-data/validateData.ts";
import {MovieReview, MovieReviewSchema} from "@/domains/movie-reviews/_schema/model";
import {MovieReviewForm} from "@/domains/movie-reviews/_feat/submit-form/schema/MovieReviewFormSchema.ts";
import {MyReviewsMutationKeys} from "@/domains/movie-reviews/_feat";
import {
    patchUpdateMovieReviewForCurrentUser,
    postCreateMovieReviewForCurrentUser
} from "@/domains/movie-reviews/_feat/my-reviews/repository/repository.ts";

/** Mutation hook for creating or updating a MovieReview owned by the current user. */
export function useSubmitUserMovieReviewMutation(): UseMutationResult<MovieReview, unknown, MovieReviewForm> {

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

    const onSuccess = () => {
        queryClient.invalidateQueries({queryKey: MyReviewsMutationKeys.all, exact: false});
    }

    return useMutation({
        mutationKey: MyReviewsMutationKeys.submit(),
        mutationFn: submitReviewData,
        onSuccess,
    });
}