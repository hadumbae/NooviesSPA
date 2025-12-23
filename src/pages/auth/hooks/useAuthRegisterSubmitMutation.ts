import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {UseFormReturn} from "react-hook-form";
import AuthRepository from "@/pages/auth/repositories/AuthRepository.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {AuthRegisterForm, AuthRegisterFormValues} from "@/pages/auth/schema/form/AuthRegisterForm.types.ts";

/**
 * Parameters for {@link useAuthRegisterSubmitMutation}.
 */
type SubmitMutationParams =
    Omit<MutationOnSubmitParams, "onSubmitSuccess" | "validationSchema"> & {
    /** React Hook Form instance managing registration state. */
    form: UseFormReturn<AuthRegisterFormValues>;

    /** Optional callback fired after successful registration. */
    onSubmitSuccess?: () => void;
};

/**
 * Registration submission mutation hook.
 *
 * @remarks
 * - Submits data via {@link AuthRepository.register}
 * - Displays success toast on completion
 * - Maps API errors back to the form on failure
 *
 * @param params - Mutation configuration and callbacks
 * @returns React Query mutation for registration submission
 *
 * @example
 * ```ts
 * const mutation = useAuthRegisterSubmitMutation({ form });
 * mutation.mutate(form.getValues());
 * ```
 */
export default function useAuthRegisterSubmitMutation(
    params: SubmitMutationParams
): UseMutationResult<void, unknown, AuthRegisterForm> {
    const {form, onSubmitSuccess, onSubmitError, successMessage, errorMessage} = params;

    /**
     * Executes registration request.
     */
    const submitRegisterData = async (data: AuthRegisterForm): Promise<void> => {
        await handleMutationResponse({
            action: () => AuthRepository.register(data),
            errorMessage: "Failed to register user. Please try again.",
        });
    };

    /**
     * Handles successful registration.
     */
    const onSuccess = () => {
        toast.success(successMessage ?? "Registered successfully. Please login.");
        onSubmitSuccess?.();
    };

    /**
     * Handles registration failure.
     */
    const onError = (error: unknown) => {
        const displayMessage =
            errorMessage ?? "Something went wrong. Failed to register user.";
        handleMutationFormError({form, error, displayMessage});
        onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: ["submit_register_data"],
        mutationFn: submitRegisterData,
        onSuccess,
        onError,
    });
}
