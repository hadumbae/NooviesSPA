/**
 * @fileoverview Hook for managing the user password update mutation and form state.
 *
 */

import {UseFormReturn} from "react-hook-form";
import {toast} from "react-toastify";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {MutationResponseConfig} from "@/common/_feat/submit-data";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {updateUserPassword} from "@/domains/users/_feat/update-password/repository";
import {UpdatePasswordMutationKeys} from "@/domains/users/_feat/update-password/hooks/mutationKeys.ts";
import {UserPasswordUpdateFormData, UserPasswordUpdateFormValues} from "@/domains/users/_feat/update-password/schema";

/** Configuration options for the password update mutation. */
export type SubmitConfig = MutationResponseConfig<void, UserPasswordUpdateFormData> & {
    form: UseFormReturn<UserPasswordUpdateFormValues, unknown, UserPasswordUpdateFormData>;
    userID: ObjectId;
}

/** Hook that provides a mutation for updating a user's password with integrated form error handling. */
export function useUpdateUserPasswordSubmitMutation(
    {userID, form, ...onSubmitConfig}: SubmitConfig
): UseMutationResult<void, unknown, UserPasswordUpdateFormData> {
    const submitPasswordUpdate = async (data: UserPasswordUpdateFormData) => {
        onSubmitConfig.submitMessage && toast.info(onSubmitConfig.submitMessage);
        onSubmitConfig.onSubmit?.(data);

        await updateUserPassword({userID, data});
    }

    const onSuccess = () => {
        onSubmitConfig.successMessage && toast.success(onSubmitConfig.successMessage);
        onSubmitConfig.onSubmitSuccess?.();
    }

    const onError = (error: Error) => {
        handleMutationFormError({error, form, displayMessage: onSubmitConfig?.errorMessage})
        onSubmitConfig.onSubmitError?.(error);
    }

    return useMutation({
        mutationKey: UpdatePasswordMutationKeys.updatePassword(),
        mutationFn: submitPasswordUpdate,
        onSuccess,
        onError,
    });
}