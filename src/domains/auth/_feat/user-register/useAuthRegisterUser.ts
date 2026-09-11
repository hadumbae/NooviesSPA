/**
 * @fileoverview Hook for handling user registration form submissions and mutation state.
 */

import {toast} from "react-toastify";
import {UseFormReturn} from "react-hook-form";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {handleFormSubmitError} from "@/common/_feat/error-handling/handleFormSubmitError.ts";
import {MutationResponseConfig} from "@/common/_feat/submit-data";
import {AuthMutationKeys} from "@/domains/auth/_feat/common/AuthMutationKeys.ts";
import {AuthRegisterForm, AuthRegisterFormValues} from "@/domains/auth/_feat/user-register/AuthRegisterFormSchema.ts";
import {postRegisterUser} from "@/domains/auth/_feat/user-register/postRegisterUser.ts";

/** Parameters for the useAuthRegisterUser hook. */
type SubmitMutationParams = MutationResponseConfig<void, AuthRegisterForm> & {
    form: UseFormReturn<AuthRegisterFormValues, unknown, AuthRegisterForm>;
};

/**
 * Manages the registration mutation, including toast notifications and form error handling.
 */
export function useAuthRegisterUser(
    {form, ...onSubmitConfig}: SubmitMutationParams
): UseMutationResult<void, unknown, AuthRegisterForm> {
    const submitRegisterData = async (data: AuthRegisterForm): Promise<void> => {
        onSubmitConfig.submitMessage && toast.info(onSubmitConfig.submitMessage);
        onSubmitConfig.onSubmit?.(data);

        await postRegisterUser(data);
    };

    const onSuccess = () => {
        onSubmitConfig.successMessage && toast.success(onSubmitConfig.successMessage);
        onSubmitConfig.onSubmitSuccess?.();
    };

    const onError = (error: unknown) => {
        handleFormSubmitError({form, error, displayMessage: onSubmitConfig.errorMessage});
        onSubmitConfig.onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: AuthMutationKeys.register(),
        mutationFn: submitRegisterData,
        onSuccess,
        onError,
    });
}
