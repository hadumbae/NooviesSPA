import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    PersonProfileImageFormSchema,
    PersonProfileImageFormValues
} from "@/domains/persons/_feat/submit-profile-image/PersonProfileImageFormSchema.ts";

/**
 * Custom hook for managing the person profile image form.
 *
 * This hook wraps `react-hook-form`'s `useForm` with:
 * - Default values for the form fields.
 * - Zod validation resolver for schema-based validation.
 *
 * Usage:
 * ```ts
 * const form = usePersonProfileImageSubmitForm();
 * const { register, handleSubmit, formState } = form;
 * ```
 *
 * @returns {UseFormReturn<PersonProfileImageFormValues>} An object containing form methods,
 *   state, and helpers from `react-hook-form`.
 */
export default function usePersonProfileImageSubmitForm(): UseFormReturn<PersonProfileImageFormValues> {
    const defaultValues: PersonProfileImageFormValues = {
        profileImage: ""
    };

    return useForm<PersonProfileImageFormValues>({
        resolver: zodResolver(PersonProfileImageFormSchema),
        defaultValues,
    });
}