/**
 * @fileoverview React Query mutation hook for creating or updating RoleType entities.
 */

import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {toast} from "react-toastify";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {MutationFormResetConfig, MutationResponseConfig} from "@/common/_feat/submit-data";
import {UseFormReturn} from "react-hook-form";
import {
    create,
    RoleType,
    RoleTypeCRUDMutationKeys,
    RoleTypeCRUDQueryKeys,
    RoleTypeFormData,
    RoleTypeFormValues,
    RoleTypeSchema,
    update,
} from "@/domains/roletype";

/** Configuration parameters for the Role Type submission mutation. */
export type FormSubmitParams = MutationResponseConfig<RoleType, RoleTypeFormData> & MutationFormResetConfig & {
    form: UseFormReturn<RoleTypeFormValues, unknown, RoleTypeFormData>;
};

/** Hook that manages the submission lifecycle for Role Type creation and updates. */
export function useRoleTypeSubmitMutation(
    {form, resetOnSubmit, resetOnSuccess, resetOnError, ...onSubmitConfig}: FormSubmitParams
): UseMutationResult<RoleType, unknown, RoleTypeFormData> {
    const queryClient = useQueryClient();

    const submitRoleTypeData = async (data: RoleTypeFormData) => {
        onSubmitConfig.submitMessage && toast.info(onSubmitConfig.submitMessage);
        onSubmitConfig.onSubmit?.(data);

        const {_id, ...values} = data;

        const action = _id
            ? () => update({_id, data: values})
            : () => create({data: values});

        const {result} = await action();

        const {data: parsed, success, error} = validateData({
            data: result,
            schema: RoleTypeSchema,
            message: "Invalid data received. Please try again.",
        });

        if (!success) throw error;
        resetOnSubmit && form.reset();

        return parsed;
    };

    const onSuccess = (roleType: RoleType) => {
        resetOnSuccess && form.reset();
        queryClient.invalidateQueries({queryKey: RoleTypeCRUDQueryKeys.all, exact: false});

        onSubmitConfig.successMessage && toast.success(onSubmitConfig.successMessage);
        onSubmitConfig.onSubmitSuccess?.(roleType);
    };

    const onError = (error: unknown) => {
        resetOnError && form.reset();

        handleMutationFormError({form, error, displayMessage: onSubmitConfig.errorMessage});
        onSubmitConfig.onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: RoleTypeCRUDMutationKeys.submitSingle(),
        mutationFn: submitRoleTypeData,
        onSuccess,
        onError,
    });
}
