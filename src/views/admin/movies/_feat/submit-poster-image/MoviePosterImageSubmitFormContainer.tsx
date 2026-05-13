/**
 * @fileoverview Container component for managing the submission of movie poster images.
 */

import {ReactElement} from 'react';
import useMoviePosterImageSubmitMutation
    from "../../../../../domains/movies/_feat/manage-images/mutations/useMoviePosterImageSubmitMutation.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {
    useMoviePosterImageSubmitForm
} from "@/domains/movies/_feat/manage-images";
import buildStandardLog from "@/common/utility/features/logger/buildStandardLog.ts";
import {
    MoviePosterImageSubmitFormView
} from "@/views/admin/movies/_feat/submit-poster-image/MoviePosterImageSubmitFormView.tsx";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {Movie} from "@/domains/movies/schema/movie/MovieSchema.ts";
import {
    MoviePosterImageFormData,
    MoviePosterImageFormValues
} from "@/domains/movies/_feat/manage-images";

/** Props for the MoviePosterImageSubmitFormContainer component. */
export type FormProps = MutationOnSubmitParams<Movie> & {
    /** The ID of the movie to attach the poster image to */
    movieID: ObjectId;
    /** Optional additional CSS class names for the container */
    className?: string;
};

/**
 * Orchestrates the form state and mutation logic for uploading a movie poster.
 */
export function MoviePosterImageSubmitFormContainer(
    {movieID, className, ...mutationProps}: FormProps
): ReactElement {
    const form = useMoviePosterImageSubmitForm();
    const mutation = useMoviePosterImageSubmitMutation({form, movieID, ...mutationProps});

    const submitPosterImage = (values: MoviePosterImageFormValues) => {
        buildStandardLog({
            msg: "Submit Movie Poster Image Form",
            component: MoviePosterImageSubmitFormContainer.name,
            context: {movie: movieID, values},
        });

        mutation.mutate(values as MoviePosterImageFormData);
    };

    return (
        <MoviePosterImageSubmitFormView
            form={form}
            mutation={mutation}
            submitHandler={submitPosterImage}
            className={className}
        />
    );
}
