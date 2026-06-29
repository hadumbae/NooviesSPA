/**
 * @fileoverview Provides a React Hook Form instance for managing RoleType query option inputs.
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    RoleTypeQueryOptions,
    RoleTypeQueryOptionsFormValues,
    RoleTypeQueryOptionsSchema,
} from "@/domains/roletypes/_feat/validate-query-options/schema";

/** Configuration parameters for the useRoleTypeQueryOptionForm hook. */
export type FormParams = {
    presetValues?: Partial<RoleTypeQueryOptionsFormValues>;
};

/** Initialises a React Hook Form for RoleType query options with Zod validation. */
export function useRoleTypeQueryOptionForm(
    {presetValues}: FormParams = {}
): UseFormReturn<RoleTypeQueryOptionsFormValues, unknown, RoleTypeQueryOptions> {
    const defaultValues: RoleTypeQueryOptionsFormValues = {
        roleName: "",
        department: "",
        sortByRoleName: "",
        sortByDepartment: "",
        ...presetValues,
    };

    return useForm<RoleTypeQueryOptionsFormValues, unknown, RoleTypeQueryOptions>({
        resolver: zodResolver(RoleTypeQueryOptionsSchema),
        defaultValues,
    });
}