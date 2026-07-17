/**
 * @fileoverview Hook for managing the user logout mutation and associated side effects.
 *
 */

import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {
    handleSubmitResponseError
} from "@/common/_feat/error-handling/handleSubmitResponseError.ts";
import {
    useLogoutAuthUser
} from "@/domains/auth/_feat/manage-auth-user-data/hooks/useLogoutAuthUser.ts";
import {AuthUserMutationKeys, logoutUser} from "@/domains/auth/_feat/access-auth-backend";
import {MutationResponseConfig} from "@/common/_feat/submit-data";

/** Hook to perform the user logout mutation and clear local authentication state. */
export function useAuthLogoutSubmitMutation(onSubmitConfig: MutationResponseConfig = {}) {
    const clearUserData = useLogoutAuthUser();

    const logout = async () => {
        onSubmitConfig.submitMessage && toast.info(onSubmitConfig.submitMessage);
        onSubmitConfig.onSubmit?.();

        await logoutUser();
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
        mutationKey: AuthUserMutationKeys.logout(),
        mutationFn: logout,
        onSuccess,
        onError,
    });
}
