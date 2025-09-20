import { UseFormReturn } from "react-hook-form";
import { Screen } from "@/pages/screens/schema/screen/Screen.types.ts";
import { ScreenForm, ScreenFormValues } from "@/pages/screens/schema/forms/ScreenForm.types.ts";
import { FormMutationResultParams } from "@/common/type/form/FormMutationResultParams.ts";
import { toast } from "react-toastify";
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import ScreenRepository from "@/pages/screens/repositories/ScreenRepository.ts";
import { ScreenSchema } from "@/pages/screens/schema/screen/Screen.schema.ts";
import handleMutationFormError from "@/common/utility/mutations/handleMutationFormError.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";

/**
 * Parameters required for submitting a screen form mutation.
 *
 * Combines form mutation parameters (`FormMutationResultParams`) with the React Hook Form instance.
 */
export type ScreenSubmitMutationParams = FormMutationResultParams<Screen> & {
    /** React Hook Form instance managing the screen form state and validation */
    form: UseFormReturn<ScreenFormValues>,
};

/**
 * Custom React hook for submitting a screen form, handling both create and edit modes.
 *
 * Provides a mutation object compatible with React Query (`UseMutationResult`), which includes
 * loading, error, and success state, as well as callbacks for handling form submission.
 *
 * @param params - Parameters controlling submission behavior, form instance, and callbacks
 * @param params._id - Required if editing; the ID of the screen being updated
 * @param params.isEditing - Flag indicating whether the form is in edit mode
 * @param params.form - React Hook Form instance
 * @param params.onSubmitSuccess - Callback fired when submission succeeds
 * @param params.onSubmitError - Callback fired when submission fails
 * @param params.successMessage - Optional success message to display
 * @param params.errorMessage - Optional error message to display
 * @returns A `UseMutationResult<Screen, unknown, ScreenForm>` object from React Query
 *
 * @example
 * ```ts
 * const { mutate, isLoading, error } = useScreenSubmitMutation({ form, isEditing: false });
 * mutate({ name: "New Screen", capacity: 150, screenType: "IMAX" });
 * ```
 */
export default function useScreenSubmitMutation(
    { _id, form, isEditing, onSubmitSuccess, onSubmitError, successMessage, errorMessage }: ScreenSubmitMutationParams
): UseMutationResult<Screen, unknown, ScreenForm> {
    const queryClient = useQueryClient();
    const mutationKey = ['submit_screen_data'];

    /**
     * Handles the actual submission to the repository.
     *
     * Chooses between create and update actions based on `isEditing`.
     * Validates the returned data against `ScreenSchema`.
     *
     * @param values - The screen form values to submit
     * @returns The validated `Screen` data
     * @throws If the returned data is invalid or fails schema validation
     */
    const submitScreenData = async (values: ScreenForm) => {
        const action = isEditing
            ? () => ScreenRepository.update({ _id, data: values })
            : () => ScreenRepository.create({ data: values });

        const returnData = await handleMutationResponse({
            action,
            errorMessage: "Failed to submit data. Please try again."
        });

        const { data: parsedData, success, error } = validateData({
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
     * Shows a success toast, triggers the `onSubmitSuccess` callback if provided.
     *
     * @param screen - The successfully submitted screen data
     */
    const onSuccess = async (screen: Screen) => {
        const actionDisplay = isEditing ? "updated" : "created";
        toast.success(successMessage || `Screen ${actionDisplay} successfully.`);
        onSubmitSuccess?.(screen);
    };

    /**
     * Called when the mutation fails.
     *
     * Handles form-level errors, shows an error toast, and triggers the `onSubmitError` callback if provided.
     *
     * @param error - The error encountered during submission
     */
    const onError = (error: unknown) => {
        const fallbackMessage = errorMessage || "Something went wrong. Please try again.";
        handleMutationFormError({ form, error, fallbackMessage });
        onSubmitError?.(error);
    };

    /**
     * Called when the mutation settles (after success or error).
     *
     * Invalidates relevant queries to refresh cached data.
     */
    const onSettled = async () => {
        await queryClient.invalidateQueries({ queryKey: ["fetch_screens_by_query"], exact: false });
    };

    return useMutation({
        mutationKey,
        mutationFn: submitScreenData,
        onSuccess,
        onError,
        onSettled,
    });
}
