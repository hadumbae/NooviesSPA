/**
 * @fileoverview React Hook Form hook for the Genre submission form.
 * Handles initialization, default values, and Zod schema validation.
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Genre} from "@/domains/genres/schema/genre/GenreSchema.ts";
import {useMemo} from "react";
import {GenreFormData, GenreFormSchema} from "@/domains/genres/_feat/submit-form/GenreFormSchema.ts";

type UseGenreSubmitFormParams = {
    genre?: Genre;
    presetValues?: Partial<GenreFormData>;
};

/**
 * Initializes a Genre form with validation and memoized default values.
 */
export default function useGenreSubmitForm(
    {genre, presetValues}: UseGenreSubmitFormParams = {}
): UseFormReturn<GenreFormData> {
    const defaultValues = useMemo<GenreFormData>(() => ({
        name: "",
        description: "",
        ...genre,
        ...presetValues,
    }), [genre, presetValues]);

    return useForm<GenreFormData>({
        resolver: zodResolver(GenreFormSchema),
        defaultValues,
    });
}