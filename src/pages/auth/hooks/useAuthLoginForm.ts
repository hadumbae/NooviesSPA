/**
 * Authentication login form hook.
 *
 * Creates a React Hook Form instance configured with
 * Zod validation and default login values.
 */
import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {AuthLoginFormSchema} from "@/pages/auth/schema/form/AuthLoginForm.schema.ts";
import {AuthLoginFormValues} from "@/pages/auth/schema/form/AuthLoginForm.types.ts";

/**
 * Initializes the login form.
 *
 * @remarks
 * - Validated using {@link AuthLoginFormSchema}
 * - All fields default to empty strings
 *
 * @returns React Hook Form instance for login input
 *
 * @example
 * ```ts
 * const form = useAuthLoginForm();
 *
 * <form onSubmit={form.handleSubmit(onSubmit)}>
 *   <input {...form.register("email")} />
 *   <input {...form.register("password")} />
 * </form>
 * ```
 */
export default function useAuthLoginForm(): UseFormReturn<AuthLoginFormValues> {
    const defaultValues: AuthLoginFormValues = {
        email: "",
        password: "",
    };

    return useForm<AuthLoginFormValues>({
        resolver: zodResolver(AuthLoginFormSchema),
        defaultValues,
    });
}
