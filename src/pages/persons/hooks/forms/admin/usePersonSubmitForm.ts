import {useForm, UseFormReturn} from "react-hook-form";
import {PersonFormSchema} from "@/pages/persons/schema/forms/PersonForm.schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import getDefaultValue from "@/common/utility/forms/getDefaultValue.ts";
import {Person, PersonDetails} from "@/pages/persons/schema/person/Person.types.ts";
import {PersonFormValues} from "@/pages/persons/schema/forms/PersonForm.types.ts";

/**
 * Parameters for initializing the `Person` form.
 */
type PersonSubmitParams = {
    /**
     * Optional preset values to prefill the form.
     *
     * These will override the defaults and any values
     * coming from the `person` object when provided.
     */
    presetValues?: Partial<PersonFormValues>;

    /**
     * An existing `Person` or `PersonDetails` object whose data
     * will be used to populate the form if no `presetValues`
     * override is provided for that field.
     */
    person?: Person | PersonDetails;
};

/**
 * React hook to initialize a `react-hook-form` instance for creating or editing a `Person`.
 *
 * - Merges `presetValues` with any existing `person` data.
 * - Falls back to empty string defaults when no value is provided.
 * - Uses Zod validation via `zodResolver` with {@link PersonFormSchema}.
 *
 * @param params - Optional initialization parameters for preset values and/or an existing person.
 *
 * @returns A `UseFormReturn` instance for managing the `PersonFormValues` form state.
 *
 * @example
 * ```ts
 * const form = usePersonSubmitForm({
 *   presetValues: { name: "John Doe" },
 *   person: existingPerson,
 * });
 *
 * return (
 *   <form onSubmit={form.handleSubmit(onSubmit)}>
 *     <input {...form.register("name")} />
 *   </form>
 * );
 * ```
 */
export default function usePersonSubmitForm(params?: PersonSubmitParams): UseFormReturn<PersonFormValues> {
    const {presetValues = {}, person} = params || {};

    const personDate = person ? person.dob.toISOString().split("T")[0] : null

    const defaultValues: PersonFormValues = {
        name: getDefaultValue(presetValues.name, person?.name, "")!,
        biography: getDefaultValue(presetValues.biography, person?.biography, "")!,
        dob: getDefaultValue(presetValues.dob, personDate, "")!,
        nationality: getDefaultValue(presetValues.nationality, person?.nationality, ""),
    };

    return useForm<PersonFormValues>({
        resolver: zodResolver(PersonFormSchema),
        defaultValues,
    });
}