/**
 * @fileoverview Hook for managing the authentication login form state and validation.
 *
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    AuthLoginFormData,
    AuthLoginFormSchema,
    AuthLoginFormValues
} from "@/domains/auth/_feat/auth-login-fom/schema";

/** Initializes a React Hook Form instance for the login process using Zod validation. */
export function useAuthLoginForm(): UseFormReturn<AuthLoginFormValues, unknown, AuthLoginFormData> {
    const defaultValues: AuthLoginFormValues = {
        email: "",
        password: "",
    };

    return useForm<AuthLoginFormValues, unknown, AuthLoginFormData>({
        resolver: zodResolver(AuthLoginFormSchema),
        defaultValues,
        mode: "onSubmit",
    });
}
