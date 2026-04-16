/**
 * @fileoverview Custom React hook for managing the Genre Query Option form.
 * Integrates React Hook Form with Zod validation for consistent form handling
 * and schema-based validation.
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {GenreQueryOptionSchema} from "@/domains/genres/schema/filters/GenreQueryOptionsSchema.ts";
import {GenreQueryOptionFormStarter} from "@/domains/genres/_feat/query-form/schema.ts";

/** Parameters accepted by {@link useGenreQueryOptionForm}. */
type QueryOptionFormParams = {
    presetValues?: Partial<GenreQueryOptionFormStarter>;
};

/**
 * Initializes and returns a React Hook Form instance for genre query filtering.
 */
export function useGenreQueryOptionForm(
    params: QueryOptionFormParams = {}
): UseFormReturn<GenreQueryOptionFormStarter> {
    const {presetValues} = params;
    const {name, sortByName} = presetValues ?? {};

    const defaultValues: GenreQueryOptionFormStarter = {
        name: name ?? "",
        sortByName: sortByName ?? "",
    };

    return useForm<GenreQueryOptionFormStarter>({
        resolver: zodResolver(GenreQueryOptionSchema),
        defaultValues,
    });
}