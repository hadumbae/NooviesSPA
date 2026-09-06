/**
 * @fileoverview Form component and custom hook for submitting movie poster images.
 */

import {createForm} from "@/common/_feat";
import {Movie} from "@/domains/movies/_schema/movie";
import {
    MoviePosterImageFormData,
    MoviePosterImageFormSchema,
    MoviePosterImageFormValues,
    useMoviePosterImageSubmitMutation,
    UseSubmitMoviePosterImageConfig
} from "@/domains/movies/_feat/manage-images/upload-poster-image";

const {SubmitForm, useSubmitForm} = createForm<
    MoviePosterImageFormValues,
    MoviePosterImageFormData,
    unknown,
    Movie,
    UseSubmitMoviePosterImageConfig
>({
    schema: MoviePosterImageFormSchema,
    formName: "movie-poster-image-submit-form",
    mutation: useMoviePosterImageSubmitMutation,
    defaultValues: {
        posterImage: "",
    }
});

export {
    /** Form component for managing and submitting movie poster image uploads. */
        SubmitForm as MoviePosterImageSubmitForm,
    /** Custom hook for accessing the movie poster image submission form state and context. */
        useSubmitForm as useMoviePosterImageSubmitForm,
}

