/**
 * @fileoverview Defines the form component and hook for submitting movie data.
 */

import {createForm} from "@/common/_feat";
import {
    Movie,
    MovieEditData,
    MovieFormData,
    MovieFormSchema,
    MovieFormStarterValues,
    useMovieSubmitMutation
} from "@/domains/movies";

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