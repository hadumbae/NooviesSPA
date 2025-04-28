import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    UserPasswordUpdateSubmit,
    UserPasswordUpdateSubmitSchema
} from "@/pages/users/schemas/UserPasswordUpdateSubmitSchema.ts";

/**
 * Custom hook for managing the user password update form using React Hook Form and Zod validation.
 *
 * @returns A configured `useForm` instance typed to `AuthUserPasswordUpdate`, with validation via Zod.
 *
 * @remarks
 * - Uses `zodResolver` to integrate `AuthUserPasswordUpdateSchema` with React Hook Form.
 * - Sets default values for `password` and `confirm` fields as empty strings.
 * - Ensures consistent validation rules across the application.
 */
export default function useUpdateUserPasswordForm() {
    const defaultValues = {
        password: "",
        confirm: "",
    };

    return useForm<UserPasswordUpdateSubmit>({
        resolver: zodResolver(UserPasswordUpdateSubmitSchema),
        defaultValues,
    })
}