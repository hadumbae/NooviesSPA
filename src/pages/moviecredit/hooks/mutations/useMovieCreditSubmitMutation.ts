/**
 * @file useMovieCreditSubmitMutation.ts
 *
 * React Query mutation hook for creating or updating movie credits.
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import MovieCreditRepository from "@/pages/moviecredit/repositories/MovieCreditRepository.ts";
import {toast} from "react-toastify";
import {MovieCreditDetails} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";
import {MovieCreditForm, MovieCreditFormValues} from "@/pages/moviecredit/schemas/form/MovieCreditForm.types.ts";
import {UseFormReturn} from "react-hook-form";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {MovieCreditDetailsSchema} from "@/pages/moviecredit/schemas/model/MovieCredit.schema.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {MovieCreditQueryKeys} from "@/pages/moviecredit/utility/query/MovieCreditQueryKeys.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

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
        const action =
            editID
                ? () => MovieCreditRepository.update({_id: editID, data: values})
                : () => MovieCreditRepository.create({data: values});

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
