/**
 * @file useScreenSubmitMutation.ts
 *
 * React Query mutation hook for creating or updating screens.
 * Encapsulates form submission, server interaction, response validation,
 * error mapping, user feedback, and query invalidation.
 */

import {ScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";
import {ScreenForm, ScreenFormValues} from "@/pages/screens/schema/forms/ScreenForm.types.ts";
import {toast} from "react-toastify";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import ScreenRepository from "@/pages/screens/repositories/ScreenRepository.ts";
import {ScreenDetailsSchema} from "@/pages/screens/schema/screen/Screen.schema.ts";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {SubmitMutationParams} from "@/common/type/form/MutationSubmitParams.ts";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {ScreenIDQueryKeys, ScreenListQueryKeys} from "@/pages/screens/constants/ScreenQueryKeys.ts";

/**
 * Parameters for {@link useScreenSubmitMutation}.
 *
 * Extends the base submit mutation params with screen-specific
 * form values and response typing.
 */
export type ScreenSubmitMutationParams =
    SubmitMutationParams<ScreenFormValues, ScreenDetails>;

/**
 * # useScreenSubmitMutation Hook
 *
 * React Query mutation hook for creating or updating a `Screen`.
 *
 * Responsibilities:
 * - Submits form data via **ScreenRepository**
 * - Validates server responses using **ScreenDetailsSchema**
 * - Maps backend validation errors to form fields
 * - Displays success/error toast notifications
 * - Invalidates screen-related queries to refresh UI state
 *
 * @param params
 * Form instance, optional edit ID, and lifecycle callbacks.
 *
 * @returns
 * React Query mutation result controlling submission state.
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

    const queryOptions = {populate: true, virtuals: true};

    const keys = [...ScreenIDQueryKeys, ...ScreenListQueryKeys].map(key => [key]);
    const invalidateQueries = useInvalidateQueryKeys({keys, exact: false});

    /**
     * Executes the create or update request.
     *
     * Selects the appropriate repository method based on `editID`
     * and validates the returned payload.
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
     * Handles a successful mutation.
     */
    const onSuccess = (screen: ScreenDetails) => {
        const fallbackMessage = editID
            ? "Screen updated successfully."
            : "Screen created successfully.";

        toast.success(successMessage || fallbackMessage);
        invalidateQueries();
        onSubmitSuccess?.(screen);
    };

    /**
     * Handles mutation errors.
     */
    const onError = (error: unknown) => {
        const displayMessage = errorMessage || "Something went wrong. Please try again.";
        handleMutationFormError({form, error, displayMessage});
        onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: ["submit_screen_data"],
        mutationFn: submitScreenData,
        onSuccess,
        onError,
    });
}
