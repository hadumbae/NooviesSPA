import {useForm} from "react-hook-form";
import {PersonSubmit, PersonSubmitSchema} from "@/pages/persons/schema/PersonSubmitSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Person} from "@/pages/persons/schema/PersonSchema.ts";
import getDefaultValue from "@/common/utility/forms/getDefaultValue.ts";

/**
 * Parameters for configuring the `usePersonSubmitForm` hook.
 */
type PersonSubmitParams = {
    /**
     * Optional preset values that override the person's existing data.
     * Typically used for initializing the form with externally provided values.
     */
    presetValues?: Partial<Person>;

    /**
     * The person object to edit. Values from this object are used as
     * form defaults unless overridden by `presetValues`.
     */
    person?: Person;
};

/**
 * Custom hook for managing the person submission form.
 *
 * This hook initializes form values using `react-hook-form` and applies Zod validation
 * using the `PersonSubmitSchema`. It supports both new entries and editing existing persons.
 *
 * Default values are derived from `presetValues`, then `person`, and fallback to safe defaults.
 *
 * @param params - Optional configuration object containing `presetValues` and/or a `person`.
 * @returns A `useForm` return object for managing form state and validation.
 */
export default function usePersonSubmitForm(params?: PersonSubmitParams) {
    const {presetValues = {}, person} = params || {};

    const defaultValues: PersonSubmit = {
        name: getDefaultValue(presetValues.name, person?.name, "")!,
        biography: getDefaultValue(presetValues.biography, person?.biography, "")!,
        dob: getDefaultValue(presetValues.dob, person?.dob, "")!,
        nationality: getDefaultValue(presetValues.nationality, person?.nationality, ""),
    };

    return useForm<PersonSubmit>({
        resolver: zodResolver(PersonSubmitSchema),
        defaultValues,
    });
}