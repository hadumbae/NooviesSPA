/**
 * @file useMovieCreditSubmitMutation.ts
 *
 * React Query mutation hook for creating or updating movie credits.
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import MovieCreditRepository from "@/domains/moviecredit/_feat/crud/MovieCreditRepository.ts";
import {toast} from "react-toastify";
import {MovieCreditForm, MovieCreditFormValues} from "@/domains/moviecredit/_feat/submit-data/MovieCreditForm.types.ts";
import {UseFormReturn} from "react-hook-form";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {MovieCreditQueryKeys} from "@/domains/moviecredit/_feat/crud/MovieCreditQueryKeys.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {
    MovieCreditDetails,
    MovieCreditDetailsSchema
} from "@/domains/moviecredit/schemas/model/MovieCreditDetailsSchema.ts";

type SubmitParams = MutationOnSubmitParams<MovieCreditDetails> & {
    /** React Hook Form instance */
    form: UseFormReturn<MovieCreditFormValues>;

    /** Existing credit ID (edit mode only) */
    editID?: ObjectId;
};

/**
 * Handles movie credit submission.
 *
 * Responsibilities:
 * - Create vs update resolution
 * - Response validation
 * - Toast notifications
 * - Form error hydration
 * - Query cache invalidation
 *
 * @returns React Query mutation instance
 */
export default function useMovieCreditSubmitMutation(
    {form, editID, onSubmitSuccess, onSubmitError, successMessage, errorMessage}: SubmitParams
): UseMutationResult<MovieCreditDetails, unknown, MovieCreditForm> {
    const invalidateQueries = useInvalidateQueryKeys();

    const submitMovieCreditData = async (values: MovieCreditForm) => {
        const submitData = {
            data: values,
            config: {populate: true, virtuals: true},
        }

        const action =
            editID
                ? () => MovieCreditRepository.update({_id: editID, ...submitData})
                : () => MovieCreditRepository.create(submitData);

        const result = await handleMutationResponse({
            action,
            errorMessage: "Failed to submit data. Please try again.",
        });

        const {data, success, error} = validateData({
            data: result,
            schema: MovieCreditDetailsSchema,
            message: "Invalid data returned. Please try again.",
        });

        if (!success) throw error;
        return data;
    };

    const onSuccess = (credit: MovieCreditDetails) => {
        invalidateQueries(
            [

                MovieCreditQueryKeys.ids({_id: credit._id}),
                MovieCreditQueryKeys.slugs(),
                MovieCreditQueryKeys.persons({personID: credit.person._id}),
                MovieCreditQueryKeys.query(),
                MovieCreditQueryKeys.paginated(),
            ],
            {exact: false},
        )

        successMessage && toast.success(successMessage);
        onSubmitSuccess?.(credit);
    };

    const onError = (error: unknown) => {
        handleMutationFormError({form, error, displayMessage: errorMessage});
        onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: ["submit_single_movie_credit"],
        mutationFn: submitMovieCreditData,
        onSuccess,
        onError,
    });
}
