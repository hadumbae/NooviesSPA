import {UseFormReturn} from "react-hook-form";
import {Screen} from "@/pages/screens/schema/screen/Screen.types.ts";
import {ScreenForm, ScreenFormValues} from "@/pages/screens/schema/forms/ScreenForm.types.ts";
import {toast} from "react-toastify";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import ScreenRepository from "@/pages/screens/repositories/ScreenRepository.ts";
import {ScreenSchema} from "@/pages/screens/schema/screen/Screen.schema.ts";
import handleMutationFormError from "@/common/utility/mutations/handleMutationFormError.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {
    MutationEditByIDParams,
    MutationOnSubmitParams
} from "@/common/type/form/MutationSubmitParams.ts";

/**
 * Parameters for submitting or editing a screen entry.
 *
 * Combines mutation lifecycle callbacks with form context and editing options.
 */
export type ScreenSubmitMutationParams = MutationOnSubmitParams<Screen> & MutationEditByIDParams & {
    /** React Hook Form instance for the screen form. */
    form: UseFormReturn<ScreenFormValues>;
};

/**
 * React Query mutation hook for creating or updating a screen entry.
 *
 * This hook:
 * - Submits form data to the backend via `ScreenRepository`
 * - Validates response data against `ScreenSchema`
 * - Displays success/error toasts and handles form-level validation errors
 * - Automatically invalidates relevant queries to refresh cached data
 *
 * @param params - Configuration object including form context, mutation callbacks, and optional messages.
 * @returns A `UseMutationResult` object exposing mutation utilities and state.
 *
 * @example
 * ```ts
 * const mutation = useScreenSubmitMutation({
 *   form,
 *   isEditing: !!screenId,
 *   _id: screenId,
 *   onSubmitSuccess: (screen) => console.log("Saved:", screen),
 * });
 *
 * form.handleSubmit((data) => mutation.mutate(data));
 * ```
 */
export default function useScreenSubmitMutation(
    {_id, form, isEditing, onSubmitSuccess, onSubmitError, successMessage, errorMessage}: ScreenSubmitMutationParams
): UseMutationResult<Screen, unknown, ScreenForm> {
    const queryClient = useQueryClient();
    const mutationKey = ['submit_screen_data'];

    /**
     * Handles the actual submission logic.
     *
     * Chooses between create and update actions depending on `isEditing`.
     * Validates the server response using `ScreenSchema` before returning.
     *
     * @param values - The form data to submit.
     * @returns The validated `Screen` entity returned by the server.
     * @throws If the response data fails validation or cannot be parsed.
     */
    const submitScreenData = async (values: ScreenForm) => {
        const action = isEditing
            ? () => ScreenRepository.update({_id, data: values})
            : () => ScreenRepository.create({data: values});

        const returnData = await handleMutationResponse({
            action,
            errorMessage: "Failed to submit data. Please try again."
        });

        const {data: parsedData, success, error} = validateData({
            data: returnData,
            schema: ScreenSchema,
            message: "Invalid data returned. Please try again.",
        });

        if (!success) throw error;
        return parsedData;
    };

    /**
     * Called when the mutation succeeds.
     *
     * Displays a success toast and triggers the optional `onSubmitSuccess` callback.
     *
     * @param screen - The validated and submitted `Screen` entity.
     */
    const onSuccess = async (screen: Screen) => {
        const actionDisplay = isEditing ? "updated" : "created";
        toast.success(successMessage || `Screen ${actionDisplay} successfully.`);
        onSubmitSuccess?.(screen);
    };

    /**
     * Called when the mutation fails.
     *
     * Maps validation errors back to form fields, displays a toast message,
     * and invokes the optional `onSubmitError` callback.
     *
     * @param error - The thrown error or rejected response from the mutation.
     */
    const onError = (error: unknown) => {
        const displayMessage = errorMessage || "Something went wrong. Please try again.";
        handleMutationFormError({form, error, displayMessage});
        onSubmitError?.(error);
    };

    /**
     * Called after the mutation has completed (regardless of success or error).
     *
     * Invalidates all screen-related queries to ensure updated data is reflected.
     */
    const onSettled = async () => {
        await queryClient.invalidateQueries({queryKey: ["fetch_screens_by_query"], exact: false});
    };

    return useMutation({
        mutationKey,
        mutationFn: submitScreenData,
        onSuccess,
        onError,
        onSettled,
    });
}
