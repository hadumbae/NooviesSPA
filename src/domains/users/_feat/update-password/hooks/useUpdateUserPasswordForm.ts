/**
 * @fileoverview Hook for managing the user password update form state and validation.
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    UserPasswordUpdateFormData,
    UserPasswordUpdateFormSchema,
    UserPasswordUpdateFormValues
} from "@/domains/users/_feat/update-password/schema";

/** Initialises a react-hook-form instance for updating user passwords using Zod validation. */
export function useUpdateUserPasswordForm(): UseFormReturn<UserPasswordUpdateFormValues, unknown, UserPasswordUpdateFormData> {
    const defaultValues: UserPasswordUpdateFormValues = {
        password: "",
        confirm: "",
    };

    return useForm<UserPasswordUpdateFormValues, unknown, UserPasswordUpdateFormData>({
        resolver: zodResolver(UserPasswordUpdateFormSchema),
        defaultValues,
    })
}