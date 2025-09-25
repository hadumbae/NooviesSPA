import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {UserRegisterSchema} from "@/pages/auth/schema/form/AuthForm.schema.ts";
import {UserRegisterData} from "@/pages/auth/schema/form/AuthForm.types.ts";

/**
 * Custom React Hook for initializing the registration form using React Hook Form.
 *
 * Integrates Zod validation with the registration schema (`UserRegisterSchema`) and
 * provides default values for all registration fields: name, email, password, and confirm password.
 *
 * @returns A `UseFormReturn<UserRegisterData>` object containing:
 * - `register` for input registration
 * - `handleSubmit` for form submission handling
 * - `control` for controlled inputs
 * - `formState` including errors and touched fields
 *
 * @example
 * ```ts
 * const form = useAuthRegisterForm();
 *
 * <form onSubmit={form.handleSubmit(onSubmit)}>
 *   <input {...form.register("name")} />
 *   <input {...form.register("email")} />
 *   <input {...form.register("password")} />
 *   <input {...form.register("confirm")} />
 * </form>
 * ```
 */
export default function useAuthRegisterForm(): UseFormReturn<UserRegisterData> {
    return useForm<UserRegisterData>({
        resolver: zodResolver(UserRegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirm: "",
        }
    });
}
