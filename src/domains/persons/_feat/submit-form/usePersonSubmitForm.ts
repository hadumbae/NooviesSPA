/**
 * @fileoverview Hook for initializing the Person form state with standardized
 * default values and Zod resolver integration.
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {
    PersonFormData,
    PersonFormResolverSchema,
    PersonFormValues
} from "@/domains/persons/_feat/submit-form/PersonFormSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Person} from "@/domains/persons/schema/person/Person.types.ts";

/**
 * Parameters for initializing the Person form state.
 */
type PersonSubmitParams = {
    presetValues?: Partial<PersonFormValues>;
    person?: Person;
};

/**
 * Hook to initialize and manage the Person submission form state.
 */
export default function usePersonSubmitForm(
    {presetValues, person}: PersonSubmitParams = {}
): UseFormReturn<PersonFormValues, unknown, PersonFormData> {
    const dob = presetValues?.dob
        ? presetValues.dob
        : person?.dob ? person.dob.toISODate() : "";

    const defaultValues: PersonFormValues = {
        name: "",
        biography: "",
        nationality: undefined,
        ...person,
        ...presetValues,
        dob,
    };

    return useForm<PersonFormValues, unknown, PersonFormData>({
        resolver: zodResolver(PersonFormResolverSchema),
        defaultValues,
    });
}