/**
 * @fileoverview Form component and hook exports for submitting genre data.
 */

import {createForm} from "@/common/_feat";
import {Genre} from "@/domains/genres/_schema/genre/GenreSchema.ts";
import {GenreFormData, GenreFormSchema, GenreFormValues} from "@/domains/genres/_feat/submit-form/schema/GenreFormSchema.ts";
import {useGenreDataSubmit} from "@/domains/genres/_feat/crud-hooks/mutate/useGenreDataSubmit.ts";

const {SubmitForm, useSubmitForm} = createForm<
    GenreFormValues,
    GenreFormData,
    Genre,
    Genre
>({
    schema: GenreFormSchema,
    mutation: useGenreDataSubmit,
    formName: "genre-form",
    defaultValues: {
        name: "",
        description: "",
        isFeatured: false,
    },
});

export {
    /** Form component for creating or updating genre data. */
        SubmitForm as GenreSubmitForm,
    /** Hook for managing genre submission form state and operations. */
        useSubmitForm as useGenreSubmitForm,
}