import {RoleTypeFormValues} from "@/pages/roletype/schema/submit-form/RoleTypeForm.types.ts";
import {RoleType} from "@/pages/roletype/schema/model/RoleType.types.ts";
import getDefaultValue from "@/common/utility/forms/getDefaultValue.ts";
import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {RoleTypeFormSchema} from "@/pages/roletype/schema/submit-form/RoleTypeForm.schema.ts";

/**
 * Parameters for initializing the `useRoleTypeSubmitForm` hook.
 */
type FormParams = {
    /**
     * Optional preset values for the form fields.
     * These values take precedence over `roleType` values when provided.
     */
    presetValues?: Partial<RoleTypeFormValues>;

    /**
     * Optional existing role type data used to populate the form.
     * Typically used when editing an existing role type.
     */
    roleType?: RoleType;
};

/**
 * Custom React hook to create and manage a role type submission form.
 *
 * Uses `react-hook-form` for form state management and validation with
 * Zod schema (`RoleTypeFormSchema`) via `zodResolver`.
 *
 * @param params - Optional parameters to prefill the form.
 *
 * @returns A `react-hook-form` instance with:
 * - `register` to bind inputs
 * - `handleSubmit` for submission
 * - `formState` containing errors and status
 * - All other `useForm` methods
 *
 * @example
 * ```ts
 * const { register, handleSubmit, formState } = useRoleTypeSubmitForm({
 *   presetValues: { roleName: "Actor" },
 *   roleType: existingRoleType
 * });
 *
 * <form onSubmit={handleSubmit(onSubmit)}>
 *   <input {...register("roleName")} />
 * </form>
 * ```
 *
 * @remarks
 * - `presetValues` take precedence over `roleType` fields.
 * - Default values fallback to empty strings if neither is provided.
 * - Validation is automatically handled via `RoleTypeFormSchema`.
 */
export default function useRoleTypeSubmitForm(params?: FormParams): UseFormReturn {
    const { presetValues, roleType } = params || {};

    const defaultValues: RoleTypeFormValues = {
        roleName: getDefaultValue(presetValues?.roleName, roleType?.roleName, ""),
        department: getDefaultValue(presetValues?.department, roleType?.department, ""),
        description: getDefaultValue(presetValues?.description, roleType?.description, ""),
    };

    return useForm<RoleTypeFormValues>({
        resolver: zodResolver(RoleTypeFormSchema),
        defaultValues,
    });
}