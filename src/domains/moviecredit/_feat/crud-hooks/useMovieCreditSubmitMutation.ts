/** @fileoverview React Query mutation hook for movie credit creation and updates. */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {UseFormReturn} from "react-hook-form";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {
    MovieCreditDetails,
    MovieCreditDetailsSchema
} from "@/domains/moviecredit/schemas/model/MovieCreditDetailsSchema.ts";
import {MovieCreditFormValues} from "@/domains/moviecredit/_feat/submit-data/schemas/MovieCreditFormValues.ts";
import {MovieCreditFormData} from "@/domains/moviecredit/_feat/submit-data/schemas/MovieCreditFormSchema.ts";
import {create, MovieCreditCRUDMutationKeys, MovieCreditCRUDQueryKeys, update} from "@/domains/moviecredit/_feat/crud";
import {MutationFormResetConfig, MutationResponseConfig} from "@/common/features/submit-data";

/** Props for the useMovieCreditSubmitMutation hook. */
type SubmitParams = MutationFormResetConfig & MutationResponseConfig<MovieCreditDetails> & {
    form: UseFormReturn<MovieCreditFormValues, unknown, MovieCreditFormData>;
};

/**
 * Manages movie credit form submissions including validation and cache synchronization.
 */
export function useMovieCreditSubmitMutation(
    params: SubmitParams
): UseMutationResult<MovieCreditDetails, unknown, MovieCreditFormData> {
    const {
        form,
        onSubmitSuccess,
        onSubmitError,
        successMessage,
        errorMessage,
        resetOnSubmit,
        resetOnSuccess,
        resetOnError
    } = params;

    const invalidateQueries = useInvalidateQueryKeys();
    const config = {populate: true, virtuals: true};

    const submitMovieCreditData = async ({_id, ...data}: MovieCreditFormData) => {
        const action = _id ? () => update({_id, data, config}) : () => create({data, config});
        const {result} = await action();

        const {data: parsed, success, error} = validateData({
            data: result,
            schema: MovieCreditDetailsSchema,
            message: "Invalid data returned. Please try again.",
        });

        if (!success) throw error;
        resetOnSubmit && form.reset();
        return parsed;
    };

    const onSuccess = (credit: MovieCreditDetails) => {
        invalidateQueries([MovieCreditCRUDQueryKeys.all], {exact: false});
        successMessage && toast.success(successMessage);

        resetOnSuccess && form.reset();
        onSubmitSuccess?.(credit);
    };

    const onError = (error: unknown) => {
        handleMutationFormError({form, error, displayMessage: errorMessage});
        resetOnError && form.reset();
        onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: MovieCreditCRUDMutationKeys.submit(),
        mutationFn: submitMovieCreditData,
        onSuccess,
        onError,
    });
}