import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {UserLoginSchema} from "@/pages/auth/schema/form/AuthForm.schema.ts";
import {UserLoginData} from "@/pages/auth/schema/form/AuthForm.types.ts";

/**
 * Custom React Hook for initializing the login form using React Hook Form.
 *
 * Integrates Zod validation with the login schema (`UserLoginSchema`) and
 * provides default values for email and password fields.
 *
 * @returns A `UseFormReturn<UserLoginData>` object containing:
 * - `register` for input registration
 * - `handleSubmit` for form submission handling
 * - `control` for controlled inputs
 * - `formState` including errors and touched fields
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
export default function useAuthLoginForm(): UseFormReturn<UserLoginData> {
    return useForm<UserLoginData>({
        resolver: zodResolver(UserLoginSchema),
        defaultValues: { email: "",  password: "" },
    });
}
