/**
 * @fileoverview Hook for initialising and managing the browse persons query options form state.
 */

import {
    useBrowsePersonsQueryOptionFormDefaultValues
} from "@/domains/persons/_feat/client-view-data/browse-persons/form/useBrowsePersonsQueryOptionFormDefaultValues.ts";
import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {BrowsePersonsQueryOptions, BrowsePersonsQueryOptionsSchema} from "@/domains/persons/_feat/client-view-data";
import {
    BrowsePersonsQueryOptionFormValues
} from "@/domains/persons/_feat/client-view-data/browse-persons/form/BrowsePersonsQueryOptionFormValues.ts";

/** Configuration options for the browse persons form hook. */
type FormConfig = {
    queryValues?: BrowsePersonsQueryOptions;
    presetValues?: Partial<BrowsePersonsQueryOptionFormValues>;
}

/** Initialises a React Hook Form instance for person browsing filters with Zod validation. */
export function useBrowsePersonsQueryOptionForm(
    {queryValues, presetValues}: FormConfig
): UseFormReturn<BrowsePersonsQueryOptionFormValues, unknown, BrowsePersonsQueryOptions> {
    const defaultValues = useBrowsePersonsQueryOptionFormDefaultValues({queryValues, presetValues});

    return useForm<BrowsePersonsQueryOptionFormValues, unknown, BrowsePersonsQueryOptions>({
        resolver: zodResolver(BrowsePersonsQueryOptionsSchema),
        defaultValues
    });
}