/**
 * Login submission mutation hook.
 *
 * Provides a React Query mutation for authenticating a user.
 * Handles API submission, response validation, global auth state updates,
 * and form-level error mapping.
 */
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {UseFormReturn} from "react-hook-form";
import AuthRepository from "@/pages/auth/repositories/AuthRepository.ts";
import useSetAuthUser from "@/pages/auth/hooks/authUser/useSetAuthUser.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {UserSchema} from "@/pages/users/schemas/user/User.schema.ts";
import {User} from "@/pages/users/schemas/user/User.types.ts";
import {AuthLoginForm, AuthLoginFormValues} from "@/pages/auth/schema/form/AuthLoginForm.types.ts";

/**
 * Parameters for {@link useAuthLoginSubmitMutation}.
 *
 * @template TUser - Authenticated user type
 */
export type SubmitMutationParams =
    Omit<MutationOnSubmitParams<User>, "validationSchema"> & {
    /**
     * React Hook Form instance managing the login form state.
     */
    form: UseFormReturn<AuthLoginFormValues>;
};

/**
 * Creates a login submission mutation.
 *
 * @remarks
 * - Calls {@link AuthRepositoryMethods.login}
 * - Validates the API response against {@link UserSchema}
 * - Updates authenticated user state on success
 * - Maps API errors back to the form on failure
 *
 * @param params - Mutation configuration and callbacks
 * @returns React Query mutation instance for login submission
 *
 * @example
 * ```ts
 * const mutation = useAuthLoginSubmitMutation({ form });
 * mutation.mutate({ email, password });
 * ```
 */
export default function useAuthLoginSubmitMutation(
    params: SubmitMutationParams
): UseMutationResult<User, unknown, AuthLoginForm> {
    const {form, onSubmitSuccess, onSubmitError, successMessage, errorMessage} = params;
    const setAuthUser = useSetAuthUser();

    /**
     * Submits login credentials and validates the API response.
     *
     * @param data - Login form values
     * @returns Authenticated user
     * @throws Validation or request errors
     */
    const submitLoginData = async (data: AuthLoginForm): Promise<User> => {
        const returnData = await handleMutationResponse({
            action: () => AuthRepository.login(data),
            errorMessage: "Failed to login. Please try again.",
        });

        const {data: parsedData, success, error} = validateData({
            data: returnData,
            schema: UserSchema,
            message: "Invalid Login API Response.",
        });

        if (!success) {
            throw error;
        }

        return parsedData;
    };

    /**
     * Handles successful authentication.
     *
     * @param user - Authenticated user
     */
    const onSuccess = (user: User) => {
        toast.success(successMessage ?? "Logged in.");
        setAuthUser(user);
        onSubmitSuccess?.(user);
    };

    /**
     * Handles authentication failure.
     *
     * Maps API errors back to the form and triggers error callbacks.
     *
     * @param error - Submission error
     */
    const onError = (error: unknown) => {
        const displayMessage = errorMessage ?? "Failed to login. Please try again.";
        handleMutationFormError({form, error, displayMessage});
        onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: ["submit_login_data"],
        mutationFn: submitLoginData,
        onSuccess,
        onError,
    });
}
