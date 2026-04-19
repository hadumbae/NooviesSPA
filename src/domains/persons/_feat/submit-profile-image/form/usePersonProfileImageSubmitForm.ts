/**
 * @fileoverview Hook for managing the person profile image upload form.
 * Encapsulates react-hook-form logic with Zod validation for profile image submissions.
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    PersonProfileImageFormData, PersonProfileImageFormSchema,
    PersonProfileImageFormValues
} from "@/domains/persons/_feat/submit-profile-image/form/PersonProfileImageFormSchema.ts";
import {useMemo} from "react";

/**
 * Custom hook to initialize and manage the profile image submission form.
 */
export function usePersonProfileImageSubmitForm(): UseFormReturn<PersonProfileImageFormValues, unknown, PersonProfileImageFormData> {
    const defaultValues: PersonProfileImageFormValues = useMemo(() => ({
        profileImage: ""
    }), []);

    return useForm<PersonProfileImageFormValues, unknown, PersonProfileImageFormData>({
        resolver: zodResolver(PersonProfileImageFormSchema),
        defaultValues,
    });
}