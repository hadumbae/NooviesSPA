/**
 * @fileoverview Hook for managing the person profile image upload form.
 *
 * Initializes a react-hook-form instance with Zod validation for profile image submissions.
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    PersonProfileImageFormData,
    PersonProfileImageFormSchema,
    PersonProfileImageFormValues
} from "@/domains/persons/_feat/submit-profile-image/form/PersonProfileImageFormSchema.ts";

export function usePersonProfileImageSubmitForm(): UseFormReturn<PersonProfileImageFormValues, unknown, PersonProfileImageFormData> {
    const defaultValues: PersonProfileImageFormValues = {
        profileImage: "",
    };

    return useForm<PersonProfileImageFormValues, unknown, PersonProfileImageFormData>({
        resolver: zodResolver(PersonProfileImageFormSchema),
        defaultValues,
    });
}