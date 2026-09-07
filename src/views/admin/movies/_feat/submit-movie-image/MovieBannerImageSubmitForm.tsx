/**
 * @fileoverview Form component and context hook for submitting a movie banner image.
 */

import {createForm} from "@/common/_feat";
import {Movie} from "@/domains/movies/_schema/movie";
import {MovieImageFormData, MovieImageFormSchema, MovieImageFormValues,} from "@/domains/movies/_feat/manage-images";
import {SubmitMovieImageConfig, useSubmitMovieBannerImage} from "@/domains/movies/_feat/manage-images/upload-image";

const {SubmitForm, useSubmitForm} = createForm<
    MovieImageFormValues,
    MovieImageFormData,
    unknown,
    Movie,
    SubmitMovieImageConfig
>({
    schema: MovieImageFormSchema,
    formName: "movie-banner-image-submit-form",
    mutation: useSubmitMovieBannerImage,
    defaultValues: {
        image: "",
    }
});

export {
    /** Form provider for managing movie banner image submissions. */
        SubmitForm as MovieBannerImageSubmitForm,
    /** Hook to access the movie banner image submit form context. */
        useSubmitForm as useMovieBannerImageSubmitForm,
};

