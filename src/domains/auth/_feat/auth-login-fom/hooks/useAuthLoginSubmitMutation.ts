/**
 * @fileoverview Hook for handling the login form submission mutation.
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {UseFormReturn} from "react-hook-form";
import {useSetAuthUser} from "@/domains/auth/_feat/manage-auth-user-data";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {UserSchema} from "@/domains/users/schemas/user/User.schema.ts";
import {User} from "@/domains/users/schemas/user/User.types.ts";
import {
    AuthLoginFormData,
    AuthLoginFormValues
} from "@/domains/auth/_feat/auth-login-fom/schema";
import {MutationResponseConfig} from "@/common/_feat/submit-data";
import {loginUser} from "@/domains/auth/_feat/access-auth-backend";

/**
 * Configuration parameters for the login submission mutation.
 */
type SubmitMutationParams = MutationResponseConfig<User, AuthLoginFormData> & {
    form: UseFormReturn<AuthLoginFormValues, unknown, AuthLoginFormData>;
};

/**
 * Provides a mutation for authenticating a user and updating the global auth state.
 */
export function useAuthLoginSubmitMutation(
    {form, ...onSubmitConfig}: SubmitMutationParams
): UseMutationResult<User, unknown, AuthLoginFormData> {
    const setAuthUser = useSetAuthUser();

    const submitLoginData = async (data: AuthLoginFormData): Promise<User> => {
        onSubmitConfig.submitMessage && toast.info(onSubmitConfig.submitMessage);
        onSubmitConfig.onSubmit?.(data);

        const {result} = await loginUser(data);
        const {data: parsedData, success, error} = validateData({
            data: result,
            schema: UserSchema,
            message: "Invalid Login API Response.",
        });

        if (!success) throw error;
        return parsedData;
    };

    const onSuccess = (user: User) => {
        setAuthUser(user);

        onSubmitConfig.successMessage && toast.success(onSubmitConfig.successMessage);
        onSubmitConfig.onSubmitSuccess?.(user);
    };

    const onError = (error: unknown) => {
        handleMutationFormError({form, error, displayMessage: onSubmitConfig.errorMessage});
        onSubmitConfig.onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: ["submit_login_data"],
        mutationFn: submitLoginData,
        onSuccess,
        onError,
    });
}
