/**
 * @file useRoleTypeSubmitMutation.ts
 *
 * React Query mutation hook for creating or updating `RoleType` entities.
 *
 * Responsibilities:
 * - Selects create vs. update behavior based on `isEditing`
 * - Normalizes API errors via `handleMutationResponse`
 * - Validates responses using `RoleTypeSchema`
 * - Maps server-side errors into `react-hook-form`
 * - Displays toast notifications
 * - Triggers consumer success/error callbacks
 * - Invalidates Role Type–related queries on success
 */

import {UseFormReturn} from "react-hook-form";
import {RoleTypeForm, RoleTypeFormValues} from "@/pages/roletype/schema/submit-form/RoleTypeForm.types.ts";
import RoleTypeRepository from "@/pages/roletype/repositories/RoleTypeRepository.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {RoleTypeSchema} from "@/pages/roletype/schema/model/RoleType.schema.ts";
import {RoleType} from "@/pages/roletype/schema/model/RoleType.types.ts";
import {toast} from "react-toastify";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {MutationEditByIDParams, MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {RoleTypeQueryKeys} from "@/pages/roletype/query/RoleTypeQueryKeys.ts";

/**
 * Parameters required to submit a Role Type form.
 */
type FormSubmitParams =
    MutationOnSubmitParams<RoleType> &
    MutationEditByIDParams & {
    /** `react-hook-form` instance controlling the form state. */
    form: UseFormReturn<RoleTypeFormValues>;
};

/**
 * React Query mutation hook for submitting Role Type form data.
 *
 * @param params - Form state, editing configuration, and lifecycle callbacks.
 * @returns Mutation object for creating or updating a Role Type.
 *
 * @throws {Error} When API calls fail or response validation fails.
 */
export default function useRoleTypeSubmitMutation(
    params: FormSubmitParams
): UseMutationResult<RoleType, unknown, RoleTypeForm> {
    const {
        form,
        onSubmitSuccess,
        onSubmitError,
        successMessage,
        errorMessage,
        isEditing,
        _id,
    } = params;

    const invalidateQueries = useInvalidateQueryKeys();

    /**
     * Submits Role Type form data to the API.
     *
     * - Executes create or update repository action
     * - Normalizes API errors
     * - Validates response schema
     */
    const submitRoleTypeData = async (values: RoleTypeForm) => {
        const action = isEditing
            ? () => RoleTypeRepository.update({_id, data: values})
            : () => RoleTypeRepository.create({data: values});

        const result = await handleMutationResponse({
            action,
            errorMessage: "Failed to submit role type data. Please try again.",
        });

        const {success, data, error} = validateData({
            data: result,
            schema: RoleTypeSchema,
            message: "Invalid data received. Please try again.",
        });

        if (!success) throw error;

        return data;
    };

    /**
     * Handles successful mutation completion.
     */
    const onSuccess = (roleType: RoleType) => {
        invalidateQueries(
            [
                RoleTypeQueryKeys.ids(),
                RoleTypeQueryKeys.query(),
                RoleTypeQueryKeys.paginated(),
            ],
            {exact: false},
        );

        successMessage && toast.success(successMessage);
        onSubmitSuccess?.(roleType);
    };

    /**
     * Handles mutation errors and maps them into form state.
     */
    const onError = (error: unknown) => {
        const actionDisplay = isEditing ? "update" : "create";
        const displayMessage =
            errorMessage ?? `Failed to ${actionDisplay} role type. Please try again.`;

        handleMutationFormError({form, error, displayMessage});
        onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: ["submit_role_type_data"],
        mutationFn: submitRoleTypeData,
        onSuccess,
        onError,
    });
}
