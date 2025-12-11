import {ScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";
import {ScreenForm, ScreenFormValues} from "@/pages/screens/schema/forms/ScreenForm.types.ts";
import {toast} from "react-toastify";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import ScreenRepository from "@/pages/screens/repositories/ScreenRepository.ts";
import {ScreenDetailsSchema} from "@/pages/screens/schema/screen/Screen.schema.ts";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {SubmitMutationParams} from "@/common/type/form/MutationSubmitParams.ts";

/**
 * Parameters required to submit or update a `Screen` entity.
 *
 * Extends the base mutation configuration with:
 * - the active React Hook Form instance
 * - the `_id` when performing edits
 *
 * Used by `useScreenSubmitMutation` to unify form state, validation,
 * backend interaction, and success/error handling.
 */
export type ScreenSubmitMutationParams =
    SubmitMutationParams<ScreenFormValues, ScreenDetails>;

/**
 * React Query mutation hook for creating or updating a `Screen`.
 *
 * This hook handles the full mutation lifecycle:
 * - Submits data to the backend via `ScreenRepository`
 * - Parses/validates server responses using `ScreenDetailsSchema`
 * - Maps backend validation errors to form fields
 * - Displays toast feedback for success and failure
 * - Invalidates screen-related queries to refresh UI state
 *
 * @param params - Form instance, edit ID, and optional lifecycle callbacks.
 * @returns A `UseMutationResult` controlling mutation state and utilities.
 *
 * @example
 * ```ts
 * const mutation = useScreenSubmitMutation({
 *   form,
 *   editID: screenId,
 *   onSubmitSuccess: (screen) => console.log("Saved:", screen),
 * });
 *
 * form.handleSubmit((data) => mutation.mutate(data));
 * ```
 */
export default function useScreenSubmitMutation(
    params: ScreenSubmitMutationParams
): UseMutationResult<ScreenDetails, unknown, ScreenForm> {
    const {form, editID, onSubmitSuccess, onSubmitError, successMessage, errorMessage} = params;

    // --- Mutation Setup ---
    const queryClient = useQueryClient();
    const mutationKey = ["submit_screen_data"];
    const queryOptions = {populate: true, virtuals: true};

    /**
     * Executes the create/update request.
     *
     * Selects the correct repository method based on `editID`,
     * performs the network request, and validates the response shape.
     *
     * @param values - The form payload submitted to the backend.
     * @returns The validated `ScreenDetails` returned from the server.
     * @throws If validation fails or the response is malformed.
     */
    const submitScreenData = async (values: ScreenForm) => {
        const action = editID
            ? () => ScreenRepository.update({_id: editID, data: values, ...queryOptions})
            : () => ScreenRepository.create({data: values, ...queryOptions});

        const returnData = await handleMutationResponse({
            action,
            errorMessage: "Failed to submit data. Please try again.",
        });

        const {data: parsedData, success, error} = validateData({
            data: returnData,
            schema: ScreenDetailsSchema,
            message: "Invalid data returned. Please try again.",
        });

        if (!success) throw error;
        return parsedData;
    };

    /**
     * Called after a successful mutation.
     *
     * Displays a success toast and triggers the optional
     * `onSubmitSuccess` callback.
     *
     * @param screen - The successfully returned `ScreenDetails`.
     */
    const onSuccess = async (screen: ScreenDetails) => {
        const label = editID ? "updated" : "created";
        toast.success(successMessage || `Screen ${label} successfully.`);

        onSubmitSuccess?.(screen);
    };

    /**
     * Handles any mutation failure.
     *
     * Attempts to map validation errors to form fields, displays an error toast,
     * and invokes the optional `onSubmitError` callback.
     *
     * @param error - The thrown or returned error object.
     */
    const onError = (error: unknown) => {
        const displayMessage = errorMessage || "Something went wrong. Please try again.";
        handleMutationFormError({form, error, displayMessage});
        onSubmitError?.(error);
    };

    /**
     * Runs after the mutation settles, whether successful or failed.
     *
     * Ensures all screen-related queries are invalidated,
     * refreshing any list/detail views dependent on up-to-date data.
     */
    const onSettled = async () => {
        const queryKeys = [
            "fetch_single_screen",
            "fetch_screens_by_query",
        ]

        await Promise.all(queryKeys.map(key => queryClient.invalidateQueries({queryKey: [key], exact: false})))
    };

    return useMutation({
        mutationKey,
        mutationFn: submitScreenData,
        onSuccess,
        onError,
        onSettled,
    });
}
