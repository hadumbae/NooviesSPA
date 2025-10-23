import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import AuthRepository from "@/pages/auth/repositories/AuthRepository.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import handleMutationResponseError from "@/common/utility/mutations/handleMutationResponseError.ts";
import useLogoutAuthUser from "@/pages/auth/hooks/authUser/useLogoutAuthUser.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";

/**
 * Parameters for configuring the logout mutation.
 *
 * Extends {@link MutationOnSubmitParams} but removes `onSubmitSuccess`
 * and `validationSchema` since logout does not require schema validation.
 */
type LogoutParams = Omit<MutationOnSubmitParams, "onSubmitSuccess" | "validationSchema"> & {
    /**
     * Optional callback fired when logout succeeds.
     */
    onSubmitSuccess?: () => void;
}

/**
 * React hook to handle user logout with side effects and mutation state management.
 *
 * This hook:
 * - Calls `AuthRepository.logout()` to perform the logout request.
 * - Clears the authenticated user state via {@link useLogoutAuthUser}.
 * - Displays success or error toasts using `react-toastify`.
 * - Invokes optional `onSubmitSuccess` and `onSubmitError` callbacks.
 * - Wraps everything in a React Query `useMutation` for managing state.
 *
 * @param params - Optional configuration for customizing messages and callbacks.
 * @returns A React Query `useMutation` result object for logout.
 *
 * @example
 * ```tsx
 * const {mutate: logout, isLoading} = useAuthLogoutSubmitMutation({
 *   successMessage: "See you next time!",
 *   onSubmitSuccess: () => navigate("/login"),
 *   onSubmitError: (error) => console.error("Logout failed:", error),
 * });
 *
 * // Trigger logout
 * logout();
 * ```
 */
export default function useAuthLogoutSubmitMutation(params: LogoutParams = {}) {
    const {onSubmitSuccess, onSubmitError, successMessage, errorMessage} = params;

    const logoutUser = useLogoutAuthUser();
    const mutationKey = ["submit_logout"];

    /**
     * Executes the logout request via the AuthRepository.
     * Wraps the API call with a standardized mutation response handler.
     *
     * @throws Error if the logout request fails.
     */
    const logout = async () => {
        await handleMutationResponse({
            action: () => AuthRepository.logout(),
            errorMessage: "Failed to log out. Please try again.",
        });
    }

    /**
     * Handles successful logout.
     * - Clears user state with {@link useLogoutAuthUser}.
     * - Displays a success toast.
     * - Invokes the optional `onSubmitSuccess` callback.
     */
    const onSuccess = () => {
        logoutUser();
        toast.success(successMessage ?? "Logged out!");
        onSubmitSuccess?.();
    };

    /**
     * Handles logout errors.
     * - Displays an error toast.
     * - Invokes the optional `onSubmitError` callback.
     *
     * @param error - The error object from the failed mutation.
     */
    const onError = (error: unknown) => {
        const displayMessage = errorMessage ?? "Failed to log out. Please try again.";
        handleMutationResponseError({error, displayMessage});
        onSubmitError?.(error);
    };

    return useMutation({
        mutationKey,
        mutationFn: logout,
        onSuccess,
        onError,
    });
}
