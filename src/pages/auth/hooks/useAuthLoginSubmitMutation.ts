import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {AuthUserDetails, AuthUserDetailsSchema} from "@/pages/auth/schema/AuthUserDetailsSchema.ts";
import {toast} from "react-toastify";
import {UseFormReturn} from "react-hook-form";
import AuthRepository from "@/pages/auth/repositories/AuthRepository.ts";
import {FormMutationOnSubmitParams} from "@/common/type/form/FormMutationResultParams.ts";
import useSetAuthUser from "@/pages/auth/hooks/authUser/useSetAuthUser.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import handleMutationFormError from "@/common/utility/mutations/handleMutationFormError.ts";
import {UserLoginData} from "@/pages/auth/schema/form/AuthForm.types.ts";

/**
 * Parameters for `useAuthLoginSubmitMutation`.
 */
export type SubmitMutationParams = Omit<FormMutationOnSubmitParams<AuthUserDetails>, "validationSchema"> & {
    /** React Hook Form instance managing the login form. */
    form: UseFormReturn<UserLoginData>;
};

/**
 * Custom React hook for handling login form submission with validation and API integration.
 *
 * This hook integrates:
 * - Form validation with `react-hook-form`.
 * - API request to log in the user.
 * - Validation of the API response against `AuthUserDetailsSchema`.
 * - Success and error handling, including toast notifications.
 * - Updating the authenticated user state.
 *
 * @param params - Configuration parameters including the form instance, optional callbacks, and messages.
 * @returns A `react-query` mutation object for login submission.
 *
 * @example
 * ```ts
 * const loginMutation = useAuthLoginSubmitMutation({
 *   form,
 *   successMessage: "Welcome back!",
 *   onSubmitSuccess: (user) => console.log("Logged in user:", user),
 * });
 *
 * loginMutation.mutate({email: "user@example.com", password: "secret"});
 * ```
 */
export default function useAuthLoginSubmitMutation(
    params: SubmitMutationParams
): UseMutationResult<AuthUserDetails, unknown, UserLoginData> {
    const {form, onSubmitSuccess, onSubmitError, successMessage, errorMessage} = params;
    const setAuthUser = useSetAuthUser();

    /**
     * Submits login data to the Auth API and validates the response.
     *
     * @param data - The login form data containing email and password.
     * @returns The validated authenticated user details.
     * @throws Will throw an error if the API response is invalid or login fails.
     */
    const submitLoginData = async (data: UserLoginData) => {
        const returnData = handleMutationResponse({
            action: () => AuthRepository.login(data),
            errorMessage: "Failed to login. Please try again.",
        });

        const {data: parsedData, success, error} = validateData({
            data: returnData,
            schema: AuthUserDetailsSchema,
            message: "Invalid Login API Response."
        });

        if (!success) throw error;
        return parsedData;
    };

    /**
     * Handles a successful login mutation.
     *
     * @param authUser - The authenticated user details returned by the API.
     */
    const onSuccess = (authUser: AuthUserDetails) => {
        toast.success(successMessage ?? "Logged in.");
        setAuthUser({authUser});
        onSubmitSuccess?.(authUser);
    };

    /**
     * Handles a failed login mutation.
     *
     * @param error - The error thrown during login submission.
     */
    const onError = (error: unknown) => {
        const displayMessage = errorMessage ?? "Failed to login. Please try again.";
        handleMutationFormError({form, error, displayMessage});
        onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: ['submit_login_data'],
        mutationFn: submitLoginData,
        onSuccess,
        onError,
    });
}
