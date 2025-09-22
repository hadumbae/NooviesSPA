import {FormMutationEditingParams, FormMutationOnSubmitParams} from "@/common/type/form/FormMutationResultParams.ts";
import {UseFormReturn} from "react-hook-form";
import {RoleTypeForm, RoleTypeFormValues} from "@/pages/roletype/schema/submit-form/RoleTypeForm.types.ts";
import RoleTypeRepository from "@/pages/roletype/repositories/RoleTypeRepository.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {RoleTypeSchema} from "@/pages/roletype/schema/model/RoleType.schema.ts";
import {RoleType} from "@/pages/roletype/schema/model/RoleType.types.ts";
import {toast} from "react-toastify";
import handleMutationFormError from "@/common/utility/mutations/handleMutationFormError.ts";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";

/**
 * Parameters for submitting Role Type form data.
 */
type FormSubmitParams = FormMutationOnSubmitParams<RoleType> &
    FormMutationEditingParams & {
    /** The `react-hook-form` instance controlling the form. */
    form: UseFormReturn<RoleTypeFormValues>;
};

/**
 * Mutation hook for creating or updating Role Types.
 *
 * - Selects the correct repository action based on `isEditing`.
 * - Wraps the API call with {@link handleMutationResponse} for error normalization.
 * - Validates the response against {@link RoleTypeSchema}.
 * - Maps server errors into `react-hook-form` field errors.
 * - Shows toast notifications and triggers success/error callbacks.
 * - Invalidates Role Type queries on settle to refresh cached data.
 *
 * @param params - Form parameters including editing state and callbacks.
 * @returns A React Query mutation for submitting Role Type data.
 *
 * @throws {FormValidationError} When the API returns validation errors (422).
 * @throws {HttpResponseError} For non-422 API errors.
 * @throws {Error} If response validation against {@link RoleTypeSchema} fails.
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

    const queryClient = useQueryClient();

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

    const onSuccess = (roleType: RoleType) => {
        const actionDisplay = isEditing ? "updated" : "created"

        toast.success(successMessage ?? `Role Type ${actionDisplay} successfully.`);
        onSubmitSuccess?.(roleType);
    }

    const onError = (error: unknown) => {
        const actionDisplay = isEditing ? "update" : "create";

        const displayMessage = errorMessage ?? `Failed to ${actionDisplay} role type. Please try again.`
        handleMutationFormError({form, error, displayMessage});
        onSubmitError?.(error);
    }

    const onSettled = async () => {
        await Promise.all([
            queryClient.invalidateQueries({queryKey: ["fetch_role_types_by_query"], exact: false}),
            queryClient.invalidateQueries({queryKey: ["fetch_single_role_type_by_id"], exact: false}),
        ]);
    }

    return useMutation({
        mutationKey: ['submit_role_type_data'],
        mutationFn: submitRoleTypeData,
        onSuccess,
        onError,
        onSettled,
    });
}