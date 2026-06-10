/**
 * @fileoverview Hook for initializing and managing the Role Type submission form state.
 *
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import type {RoleType} from "@/domains/roletype/schema";
import {RoleTypeFormData, RoleTypeFormSchema, RoleTypeFormValues} from "@/domains/roletype/_feat";
import {FormValuesConfig} from "@/common/_feat/submit-data";

/** Initializes and manages the state for the role type submission form. */
export function useRoleTypeSubmitForm(
    {presetValues, editEntity}: FormValuesConfig<RoleTypeFormValues, RoleType> = {}
): UseFormReturn<RoleTypeFormValues, unknown, RoleTypeFormData> {
    const defaultValues: RoleTypeFormValues = {
        roleName: "",
        department: undefined as any,
        category: undefined as any,
        description: "",
        ...editEntity,
        ...presetValues,
    };

    return useForm<RoleTypeFormValues, unknown, RoleTypeFormData>({
        resolver: zodResolver(RoleTypeFormSchema),
        defaultValues,
    });
}