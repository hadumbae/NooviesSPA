/**
 * @fileoverview Hook for managing the user logout mutation and associated side effects.
 */

import {toast} from "react-toastify";
import {useMutation} from "@tanstack/react-query";
import {handleSubmitResponseError} from "@/common/_feat/error-handling/handleSubmitResponseError.ts";
import {useLogoutAuthUser} from "@/domains/auth/_feat/manage-auth-user-data/useLogoutAuthUser.ts";
import {MutationResponseConfig} from "@/common/_feat/submit-data/mutationTypes.ts";
import {AuthMutationKeys} from "@/domains/auth/_feat/common/AuthMutationKeys.ts";
import {postLogoutUser} from "@/domains/auth/_feat/user-logout/postLogoutUser.ts";

/** Hook to perform the user logout mutation and clear local authentication state. */
export function useAuthLogoutUser(onSubmitConfig: MutationResponseConfig = {}) {
    const clearUserData = useLogoutAuthUser();

    const logout = async () => {
        onSubmitConfig.submitMessage && toast.info(onSubmitConfig.submitMessage);
        onSubmitConfig.onSubmit?.();

        await postLogoutUser();
    }

    const onSuccess = () => {
        clearUserData();

        onSubmitConfig.successMessage && toast.info(onSubmitConfig.successMessage);
        onSubmitConfig.onSubmitSuccess?.();
    };

    const onError = (error: unknown) => {
        handleSubmitResponseError({error, displayMessage: onSubmitConfig.errorMessage});
        onSubmitConfig.onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: AuthMutationKeys.logout(),
        mutationFn: logout,
        onSuccess,
        onError,
    });
}
