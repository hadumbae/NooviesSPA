/**
 * @fileoverview React Query mutation hook for creating or updating Theatre Screen records.
 * Manages the submission lifecycle, validation of returned data, and cache invalidation.
 */

import {toast} from "react-toastify";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {TheatreScreenDetails, TheatreScreenDetailsSchema} from "@/domains/theatre-screens/schema/model";
import {TheatreScreenFormData, TheatreScreenFormValues} from "@/domains/theatre-screens/_feat/submit-data";
import {MutationResponseConfig} from "@/common/features/submit-data";
import {create, update} from "@/domains/theatre-screens/_feat/crud";
import {UseFormReturn} from "react-hook-form";
import {TheatreScreenCRUDMutationKeys} from "@/domains/theatre-screens/_feat/crud-hooks/mutationKeys.ts";
import {TheatreScreenCRUDQueryKeys} from "@/domains/theatre-screens/_feat/crud-hooks/queryKeys.ts";

/**
 * Configuration parameters for the useTheatreScreenSubmitMutation hook.
 */
export type SubmitParams = MutationResponseConfig<TheatreScreenDetails> & {
    form: UseFormReturn<TheatreScreenFormValues, unknown, TheatreScreenFormData>;
};

/**
 * Handles the persistence logic for Theatre Screens.
 */
export function useTheatreScreenSubmitMutation(
    params: SubmitParams
): UseMutationResult<TheatreScreenDetails, unknown, TheatreScreenFormData> {
    const {form, onSubmitSuccess, onSubmitError, successMessage, errorMessage} = params;

    const config = {populate: true, virtuals: true};
    const invalidateQueries = useInvalidateQueryKeys();

    /**
     * Executes the API request and validates the resulting entity.
     */
    const submitScreenData = async ({_id, ...values}: TheatreScreenFormData) => {
        const action = _id
            ? () => update({_id, data: values, config})
            : () => create({data: values, config});

        const {result} = await action();

        const {data: parsedData, success, error} = validateData({
            data: result,
            schema: TheatreScreenDetailsSchema,
            message: "Invalid data returned. Please try again.",
        });

        if (!success) throw error;
        return parsedData;
    };

    /**
     * Clears the cache and notifies the user on successful persistence.
     */
    const onSuccess = (screen: TheatreScreenDetails) => {
        invalidateQueries([TheatreScreenCRUDQueryKeys.all], {exact: false});

        if (successMessage) {
            toast.success(successMessage);
        }

        onSubmitSuccess?.(screen);
    };

    /**
     * Processes submission errors and binds them back to form fields if applicable.
     */
    const onError = (error: unknown) => {
        const displayMessage = errorMessage ?? "Something went wrong. Please try again.";
        handleMutationFormError({form, error, displayMessage});
        onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: TheatreScreenCRUDMutationKeys.submit(),
        mutationFn: submitScreenData,
        onSuccess,
        onError,
    });
}