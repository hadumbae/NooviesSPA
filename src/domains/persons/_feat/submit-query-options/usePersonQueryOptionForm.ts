/**
 * @fileoverview Hook for managing the person query options form state and validation.
 */

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm, UseFormReturn} from "react-hook-form";
import {PersonQueryOptions, PersonQueryOptionsSchema} from "@/domains/persons/schema";
import {PersonQueryOptionFormValues} from "@/domains/persons/_feat/submit-query-options/schema.ts";

/** Configuration parameters for the person query option form hook. */
type FormParams = {
    presetValues?: PersonQueryOptions;
};

/** Initialises a React Hook Form instance for filtering and sorting person records. */
export function usePersonQueryOptionForm(
    {presetValues}: FormParams = {},
): UseFormReturn<PersonQueryOptionFormValues, unknown, PersonQueryOptions> {
    const defaultValues: PersonQueryOptionFormValues = {
        name: "",
        dob: "",
        nationality: "",
        sortByName: "",
        sortByDOB: "",
        sortByNationality: "",
        ...presetValues
    };

    return useForm<PersonQueryOptionFormValues, unknown, PersonQueryOptions>({
        resolver: zodResolver(PersonQueryOptionsSchema),
        defaultValues,
    });
}
