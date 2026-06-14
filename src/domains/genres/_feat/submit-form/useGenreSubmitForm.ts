/**
 * @fileoverview React Hook Form hook for the Genre submission form.
 * Handles initialization, default values, and Zod schema validation.
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Genre} from "@/domains/genres/schema/genre/GenreSchema.ts";
import {useMemo} from "react";
import {GenreFormData, GenreFormSchema} from "@/domains/genres/_feat/submit-form/GenreFormSchema.ts";
import {FormValuesConfig} from "@/common/_feat/submit-data";

/**
 * Initializes a Genre form with validation and memoized default values.
 */
export default function useGenreSubmitForm(
    {editEntity, presetValues}: FormValuesConfig<GenreFormData, Genre> = {}
): UseFormReturn<GenreFormData, unknown, GenreFormData> {
    const defaultValues = useMemo<GenreFormData>(() => ({
        name: "",
        description: "",
        ...editEntity,
        ...presetValues,
    }), [editEntity, presetValues]);

    return useForm<GenreFormData, unknown, GenreFormData>({
        resolver: zodResolver(GenreFormSchema),
        defaultValues,
    });
}