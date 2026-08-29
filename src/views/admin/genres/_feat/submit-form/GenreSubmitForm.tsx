/**
 * @fileoverview Form component and hook exports for submitting genre data.
 */

import {createForm} from "@/common/_feat";
import {Genre, GenreFormData, GenreFormSchema, GenreFormValues, useGenreDataSubmit} from "@/domains/genres";

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
    },
});

export {
    /** Form component for creating or updating genre data. */
        SubmitForm as GenreSubmitForm,
    /** Hook for managing genre submission form state and operations. */
        useSubmitForm as useGenreSubmitForm,
}