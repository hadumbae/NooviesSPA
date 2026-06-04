/**
 * @fileoverview Hook for managing the user registration form state and validation.
 *
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    AuthRegisterForm,
    AuthRegisterFormSchema,
    AuthRegisterFormValues
} from "@/domains/auth/_feat/auth-register-form/schema";

/** Initialises a React Hook Form instance for user registration with Zod validation. */
export function useAuthRegisterForm(): UseFormReturn<AuthRegisterFormValues, unknown, AuthRegisterForm> {
    const defaultValues: AuthRegisterFormValues = {
        name: "",
        email: "",
        password: "",
        confirm: "",
    };

    return useForm<AuthRegisterFormValues, unknown, AuthRegisterForm>({
        resolver: zodResolver(AuthRegisterFormSchema),
        defaultValues,
        mode: "onSubmit",
    });
}
