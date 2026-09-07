/**
 * @fileoverview Form component and custom hook for submitting movie poster images.
 */

import {createForm} from "@/common/_feat";
import {Movie} from "@/domains/movies/_schema/movie";
import {MovieImageFormData, MovieImageFormSchema, MovieImageFormValues} from "@/domains/movies/_feat/manage-images";
import {SubmitMovieImageConfig, useSubmitMoviePosterImage} from "@/domains/movies/_feat/manage-images/upload-image";

const {SubmitForm, useSubmitForm} = createForm<
    MovieImageFormValues,
    MovieImageFormData,
    unknown,
    Movie,
    SubmitMovieImageConfig
>({
    schema: MovieImageFormSchema,
    formName: "movie-poster-image-submit-form",
    mutation: useSubmitMoviePosterImage,
    defaultValues: {
        image: "",
    }
});

export {
    /** Form component for managing and submitting movie poster image uploads. */
        SubmitForm as MoviePosterImageSubmitForm,
    /** Custom hook for accessing the movie poster image submission form state and context. */
        useSubmitForm as useMoviePosterImageSubmitForm,
}

