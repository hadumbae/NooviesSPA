/**
 * @fileoverview React Hook Form hook for the Genre submission form.
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Genre} from "@/domains/genres/_schema/genre/GenreSchema.ts";
import {GenreFormData, GenreFormSchema} from "@/domains/genres/_feat/submit-form/schema/GenreFormSchema.ts";
import {FormValuesConfig} from "@/common/_feat/submit-data";

/**
 * Initializes a Genre form with validation and memoized default values.
 */
export function useGenreSubmitForm(
    {editEntity, presetValues}: FormValuesConfig<GenreFormData, Genre> = {}
): UseFormReturn<GenreFormData, unknown, GenreFormData> {
    const defaultValues = {
        name: "",
        description: "",
        ...editEntity,
        ...presetValues,
    };

    return useForm<GenreFormData, unknown, GenreFormData>({
        resolver: zodResolver(GenreFormSchema),
        defaultValues,
    });
}