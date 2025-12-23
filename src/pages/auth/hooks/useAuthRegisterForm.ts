/**
 * Registration form hook.
 *
 * Initializes a React Hook Form instance for user registration
 * with Zod validation and default field values.
 */
import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {AuthRegisterFormSchema} from "@/pages/auth/schema/form/AuthRegisterForm.schema.ts";
import {AuthRegisterFormValues} from "@/pages/auth/schema/form/AuthRegisterForm.types.ts";

/**
 * Creates and returns a configured registration form instance.
 *
 * @remarks
 * - Uses {@link AuthRegisterFormSchema} for validation
 * - Provides empty default values for all fields
 *
 * @returns React Hook Form instance for registration input
 *
 * @example
 * ```ts
 * const form = useAuthRegisterForm();
 * form.handleSubmit(onSubmit);
 * ```
 */
export default function useAuthRegisterForm(): UseFormReturn<AuthRegisterFormValues> {
    const defaultValues: AuthRegisterFormValues = {
        name: "",
        email: "",
        password: "",
        confirm: "",
    };

    return useForm<AuthRegisterFormValues>({
        resolver: zodResolver(AuthRegisterFormSchema),
        defaultValues,
    });
}
