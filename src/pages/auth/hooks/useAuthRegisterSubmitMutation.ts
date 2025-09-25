import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {toast} from "react-toastify";
import AuthRepository from "@/pages/auth/repositories/AuthRepository.ts";
import {UseFormReturn} from "react-hook-form";
import {FormMutationOnSubmitParams} from "@/common/type/form/FormMutationResultParams.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import handleMutationFormError from "@/common/utility/mutations/handleMutationFormError.ts";
import {UserRegisterData} from "@/pages/auth/schema/form/AuthForm.types.ts";

/**
 * Parameters for the `useAuthRegisterSubmitMutation` hook.
 *
 * Extends `FormMutationOnSubmitParams` (excluding `onSubmitSuccess` and `validationSchema`)
 * and requires the React Hook Form instance and a custom success callback.
 */
type SubmitMutationParams = Omit<FormMutationOnSubmitParams, "onSubmitSuccess" | "validationSchema"> & {
    /** React Hook Form instance managing the registration form. */
    form: UseFormReturn<UserRegisterData>;

    /** Optional callback fired when the registration succeeds. */
    onSubmitSuccess?: () => void;
};

/**
 * Custom React Query mutation hook for submitting a user registration form.
 *
 * Handles API submission, success notifications, and form error handling.
 *
 * @param params - Configuration parameters for the mutation.
 * @returns A React Query mutation object that can be used to trigger the registration mutation.
 *
 * @example
 * ```ts
 * const { mutate, isLoading } = useAuthRegisterSubmitMutation({
 *   form,
 *   onSubmitSuccess: () => console.log("User registered!"),
 *   successMessage: "You have been successfully registered!",
 *   errorMessage: "Registration failed. Please try again."
 * });
 *
 * mutate(form.getValues());
 * ```
 */
export default function useAuthRegisterSubmitMutation(
    params: SubmitMutationParams
): UseMutationResult<void, unknown, UserRegisterData> {
    const {form, onSubmitSuccess, onSubmitError, successMessage, errorMessage} = params;

    /**
     * Executes the API call to register a user.
     *
     * @param data - User registration form data.
     */
    const submitRegisterData = async (data: UserRegisterData) => {
        await handleMutationResponse({
            action: () => AuthRepository.register(data),
            errorMessage: "Failed to register user. Please try again."
        });
    };

    /**
     * Callback fired when the registration mutation succeeds.
     *
     * Displays a success toast and calls the user-provided `onSubmitSuccess`.
     */
    const onSuccess = async () => {
        toast.success(successMessage ?? "Registered successfully. Please login in.");
        onSubmitSuccess?.();
    };

    /**
     * Callback fired when the registration mutation fails.
     *
     * Handles form errors and calls the user-provided `onSubmitError`.
     *
     * @param error - The error thrown during mutation.
     */
    const onError = (error: unknown) => {
        const displayMessage = errorMessage ?? "Something went wrong. Failed to register user.";
        handleMutationFormError({form, error, displayMessage});
        onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: ['submit_register_data'],
        mutationFn: submitRegisterData,
        onSuccess,
        onError,
    });
}
