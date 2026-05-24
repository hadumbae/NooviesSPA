/**
 * @fileoverview Hook for handling the creation and updating of showing records with validation and toast notifications.
 *
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {toast} from "react-toastify";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {ShowingFormValues} from "@/domains/showings/schema/form/form-values/ShowingFormValues.ts";
import {ShowingDetails, ShowingDetailsSchema} from "@/domains/showings/schema/showing";
import {ShowingFormData} from "@/domains/showings/schema/form";
import {MutationFormConfig, MutationResponseConfig} from "@/common/_feat/submit-data";
import {create, update} from "@/domains/showings/_feat/crud";
import {ShowingCRUDMutationKeys} from "@/domains/showings/_feat/crud-hooks/mutationKeys.ts";

/** Configuration parameters for the showing submission mutation. */
type SubmitParams =
    MutationResponseConfig<ShowingDetails, ShowingFormData>
    & MutationFormConfig<ShowingFormValues, ShowingFormData>;

/** Hook that manages the submission lifecycle for creating or updating showings. */
export function useShowingSubmitMutation(
    {form, resetForm, ...onSubmitConfig}: SubmitParams
): UseMutationResult<ShowingDetails, unknown, ShowingFormData> {
    const config = {populate: true, virtuals: true};
    const queryClient = useQueryClient();

    const submitShowings = async (params: ShowingFormData) => {
        onSubmitConfig.submitMessage && toast.success(onSubmitConfig.submitMessage);
        onSubmitConfig.onSubmit?.(params);

        const {_id, ...data} = params;

        const action = _id ? () => update({_id, data, config}) : () => create({data, config});
        const {result} = await action();

        const {data: parsed, success, error} = validateData({
            data: result,
            schema: ShowingDetailsSchema,
            message: "Invalid data received.",
        });

        if (!success) throw error;
        return parsed;
    };

    const onSuccess = (showing: ShowingDetails) => {
        queryClient.invalidateQueries({queryKey: ["showings"], exact: false});
        onSubmitConfig.successMessage && toast.success(onSubmitConfig.successMessage);
        onSubmitConfig.onSubmitSuccess?.(showing);
    };

    const onError = (error: unknown) => {
        handleMutationFormError({form, error, displayMessage: onSubmitConfig.errorMessage});
        onSubmitConfig.onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: ShowingCRUDMutationKeys.submitSingle(),
        mutationFn: submitShowings,
        onSuccess,
        onError,
    });
}
