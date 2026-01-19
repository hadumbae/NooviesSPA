import {useMutation, UseMutationResult} from "@tanstack/react-query";
import MovieCreditRepository from "@/pages/moviecredit/repositories/MovieCreditRepository.ts";
import {toast} from "react-toastify";
import {MovieCredit} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";
import {MovieCreditForm, MovieCreditFormValues} from "@/pages/moviecredit/schemas/form/MovieCreditForm.types.ts";
import {UseFormReturn} from "react-hook-form";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {MovieCreditSchema} from "@/pages/moviecredit/schemas/model/MovieCredit.schema.ts";
import {MutationEditByIDParams, MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {MovieCreditQueryKeys} from "@/pages/moviecredit/utility/query/MovieCreditQueryKeys.ts";

/**
 * Params for {@link useMovieCreditSubmitMutation}.
 */
type SubmitParams =
    MutationOnSubmitParams<MovieCredit> &
    MutationEditByIDParams & {
    /** React Hook Form instance */
    form: UseFormReturn<MovieCreditFormValues>;
};

/**
 * Submit or update a movie credit.
 *
 * Handles validation, toasts, form errors,
 * and cache invalidation.
 */
export default function useMovieCreditSubmitMutation(
    params: SubmitParams
): UseMutationResult<MovieCredit, unknown, MovieCreditForm> {
    const {
        form,
        onSubmitSuccess,
        onSubmitError,
        successMessage,
        errorMessage,
        isEditing,
        _id,
    } = params;

    const invalidateQueries = useInvalidateQueryKeys();

    const submitMovieCreditData = async (values: MovieCreditForm) => {
        const action =
            isEditing
                ? () => MovieCreditRepository.update({_id, data: values})
                : () => MovieCreditRepository.create({data: values});

        const result = await handleMutationResponse({
            action,
            errorMessage: "Failed to submit data. Please try again.",
        });

        const {data, success, error} = validateData({
            data: result,
            schema: MovieCreditSchema,
            message: "Invalid data returned. Please try again.",
        });

        if (!success) throw error;
        return data;
    };

    const onSuccess = (credit: MovieCredit) => {
        invalidateQueries(
            [

                MovieCreditQueryKeys.ids({_id: credit._id}),
                MovieCreditQueryKeys.slugs(),
                MovieCreditQueryKeys.persons({personID: credit.person}),
                MovieCreditQueryKeys.query(),
                MovieCreditQueryKeys.paginated(),
            ],
            {exact: false},
        )

        successMessage && toast.success(successMessage);
        onSubmitSuccess?.(credit);
    };

    const onError = (error: unknown) => {
        const actionLabel = isEditing ? "update" : "create";
        const fallbackMessage =
            errorMessage ?? `Failed to ${actionLabel} movie credit. Please try again.`;

        handleMutationFormError({form, error, displayMessage: fallbackMessage});
        onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: ["submit_single_movie_credit"],
        mutationFn: submitMovieCreditData,
        onSuccess,
        onError,
    });
}
