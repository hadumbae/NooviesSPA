import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {GenreFormSchema} from "@/pages/genres/schema/form/GenreForm.schema.ts";
import {GenreFormValues} from "@/pages/genres/schema/form/GenreForm.types.ts";
import {Genre} from "@/pages/genres/schema/genre/Genre.types.ts";
import getDefaultValue from "@/common/utility/forms/getDefaultValue.ts";

type useGenreSubmitFormParams = {
    /**
     * Existing genre data to prefill the form.
     */
    genre?: Genre;

    /**
     * Partial preset values to override or supplement initial form values.
     */
    presetValues?: Partial<GenreFormValues>;
};

/**
 * React hook to create and manage a form for submitting or editing a genre.
 *
 * It initializes default values based on an optional existing `genre` object
 * and/or optional `presetValues` to override those defaults.
 *
 * Uses `react-hook-form` with Zod validation schema (`GenreFormSchema`).
 *
 * @param param - Optional parameters including:
 *   - `genre`: Existing genre data for editing.
 *   - `presetValues`: Partial values to preset or override initial form fields.
 *
 * @returns A `react-hook-form` form instance typed with `GenreFormValues`.
 */
export default function useGenreSubmitForm(param?: useGenreSubmitFormParams) {
    const {genre, presetValues} = param || {};

    const defaultValues: GenreFormValues = {
        name: getDefaultValue(presetValues?.name, genre?.name, ""),
        description: getDefaultValue(presetValues?.description, genre?.description, ""),
    };

    return useForm<GenreFormValues>({
        resolver: zodResolver(GenreFormSchema),
        defaultValues,
    });
}