/**
 * @fileoverview Custom React hook for managing the Genre Query Option form.
 *
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {GenreQueryOptionFormStarter} from "@/domains/genres/_feat/query-form/form/schema.ts";
import {GenreQueryOptionSchema} from "@/domains/genres/schema";

/** Parameters for the useGenreQueryOptionForm hook. */
type QueryOptionFormParams = {
    presetValues?: Partial<GenreQueryOptionFormStarter>;
};

/** Initializes a React Hook Form instance for genre query filtering. */
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