/**
 * @fileoverview Defines the form component and hook for submitting movie data.
 */

import {createForm} from "@/common/_feat";
import {Movie} from "@/domains/movies/_schema/movie/MovieSchema.ts";
import {
    MovieEditData,
    MovieFormData,
    MovieFormSchema,
    MovieFormStarterValues,
} from "@/domains/movies/_feat/submit-data";
import {useMovieSubmitMutation} from "@/domains/movies/_feat/crud-hooks";

const {SubmitForm, useSubmitForm} = createForm<
    MovieFormStarterValues,
    MovieFormData,
    MovieEditData,
    Movie
>({
    formName: "movie-submit-form",
    schema: MovieFormSchema,
    mutation: useMovieSubmitMutation,
    defaultValues: {
        title: "",
        originalTitle: "",
        tagline: "",
        country: "",
        synopsis: "",
        releaseDate: "",
        isReleased: false,
        runtime: "",
        originalLanguage: "",
        trailerURL: "",
        languages: [],
        subtitles: [],
        genres: [],
        isAvailable: true,
    }
});

export {
    /** Form component for submitting movie creation and update forms. */
        SubmitForm as MovieSubmitForm,
    /** Custom hook for managing the movie submit form state and mutation handler. */
        useSubmitForm as useMovieSubmitForm,
}