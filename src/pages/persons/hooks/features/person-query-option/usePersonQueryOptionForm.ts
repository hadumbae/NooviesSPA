/**
 * @file usePersonQueryOptionForm.ts
 * @description Provides a typed React Hook Form instance for managing person query options.
 * Used in pages and components that handle person search, filtering, and sorting.
 */

import { useForm, UseFormReturn } from "react-hook-form";
import { PersonQueryOptionFormValues } from "@/pages/persons/schema/queries/PersonQueryOptionFormValueSchema.ts";
import { PersonQueryOptions } from "@/pages/persons/schema/queries/PersonQueryOption.types.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonQueryOptionsSchema } from "@/pages/persons/schema/queries/PersonQueryOption.schema.ts";

/**
 * Parameters for initializing the person query option form.
 */
type FormParams = {
    /**
     * Optional preset values for initializing the form.
     * Commonly derived from URL search parameters.
     */
    presetValues?: PersonQueryOptions;
};

/**
 * A custom React hook that initializes a `react-hook-form` instance
 * for person query options with type safety, Zod validation,
 * and support for preset values.
 *
 * @function usePersonQueryOptionForm
 * @param {FormParams} [params] - Optional parameters to configure the form.
 * @param {PersonQueryOptions} [params.presetValues] - Pre-filled values to set as form defaults.
 * @returns {UseFormReturn<PersonQueryOptionFormValues>} A configured React Hook Form instance.
 *
 * @example
 * ```tsx
 * const form = usePersonQueryOptionForm({
 *   presetValues: { name: "Alice", sortByName: "asc" }
 * });
 *
 * return (
 *   <Form {...form}>
 *     <input {...form.register("name")} placeholder="Name" />
 *   </Form>
 * );
 * ```
 */
export default function usePersonQueryOptionForm(
    params: FormParams = {},
): UseFormReturn<PersonQueryOptionFormValues> {
    const { presetValues } = params;

    const defaultValues: PersonQueryOptionFormValues = {
        name: presetValues?.name ?? "",
        dob: presetValues?.dob ?? "",
        nationality: presetValues?.nationality ?? "",
        sortByName: presetValues?.sortByName ?? "",
        sortByDOB: presetValues?.sortByDOB ?? "",
        sortByNationality: presetValues?.sortByNationality ?? "",
    };

    return useForm<PersonQueryOptionFormValues>({
        resolver: zodResolver(PersonQueryOptionsSchema),
        defaultValues,
    });
}
