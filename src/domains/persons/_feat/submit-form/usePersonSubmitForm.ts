/**
 * @fileoverview Hook for initialising the Person form state with standardised default values and Zod resolver integration.
 *
 */

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm, UseFormReturn} from "react-hook-form";
import {Person} from "@/domains/persons/_schema";
import {FormValuesConfig} from "@/common/_feat/submit-data";
import {
    PersonFormData,
    PersonFormSchema,
    PersonFormValues
} from "@/domains/persons/_feat/submit-form/PersonFormSchema.ts";

/** Hook to initialize and manage the Person submission form state. */
export function usePersonSubmitForm(
    {presetValues, editEntity}: FormValuesConfig<PersonFormValues, Person> = {}
): UseFormReturn<PersonFormValues, unknown, PersonFormData> {
    const dob = presetValues?.dob
        ? presetValues.dob
        : editEntity?.dob ? editEntity.dob.toISODate() : "";

    const defaultValues: PersonFormValues = {
        name: "",
        biography: "",
        nationality: undefined,
        ...editEntity,
        ...presetValues,
        dob,
    };

    return useForm<PersonFormValues, unknown, PersonFormData>({
        resolver: zodResolver(PersonFormSchema),
        defaultValues,
    });
}