import {
    RoleTypeQueryOptions,
    RoleTypeQueryOptionsFormValues
} from "@/pages/roletype/schema/query-options/RoleTypeQueryOptions.types.ts";
import getDefaultValue from "@/common/utility/forms/getDefaultValue.ts";
import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {RoleTypeQueryOptionsSchema} from "@/pages/roletype/schema/query-options/RoleTypeQueryOptions.schema.ts";

type FormParams = {
    /**
     * Optional preset values to prefill the RoleType query options form.
     * Can include any subset of the query options.
     */
    presetValues: Partial<RoleTypeQueryOptions>;
};

/**
 * Custom React Hook to create a `useForm` instance for the RoleType query options form.
 *
 * Uses `RoleTypeQueryOptionsSchema` for validation via `zodResolver` and automatically
 * fills in default values for any missing preset values using `getDefaultValue`.
 *
 * @param {FormParams} params - Parameters for initializing the form.
 * @param {Partial<RoleTypeQueryOptions>} params.presetValues - Optional preset values to prefill the form.
 *
 * @returns {UseFormReturn<RoleTypeQueryOptionsFormValues>} A React Hook Form instance
 *   configured for RoleType query options. This can be used directly in your form components.
 *
 * @example
 * ```ts
 * const { register, handleSubmit } = useRoleTypeQueryOptionForm({
 *   presetValues: { roleName: "Actor", department: "CAST" }
 * });
 *
 * // In JSX:
 * <input {...register("roleName")} />
 * <select {...register("department")}>...</select>
 * ```
 */
export default function useRoleTypeQueryOptionForm(params?: FormParams): UseFormReturn<RoleTypeQueryOptionsFormValues> {
    const {presetValues} = params || {};

    const defaultValues = {
        roleName: getDefaultValue(presetValues?.roleName, null, ""),
        department: getDefaultValue(presetValues?.department, null, ""),
        sortByRoleName: getDefaultValue(presetValues?.sortByRoleName, null, ""),
        sortByDepartment: getDefaultValue(presetValues?.sortByDepartment, null, ""),
    };

    return useForm<RoleTypeQueryOptionsFormValues>({
        resolver: zodResolver(RoleTypeQueryOptionsSchema),
        defaultValues,
    });
}