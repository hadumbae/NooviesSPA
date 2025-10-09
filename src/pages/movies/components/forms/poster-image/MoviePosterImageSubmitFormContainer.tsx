import { FC } from 'react';
import { FormMutationOnSubmitParams } from "@/common/type/form/FormMutationResultParams.ts";
import { Movie } from "@/pages/movies/schema/movie/Movie.types.ts";
import useMoviePosterImageSubmitMutation
    from "@/pages/movies/hooks/admin/poster-image/useMoviePosterImageSubmitMutation.ts";
import { ObjectId } from "@/common/schema/strings/IDStringSchema.ts";
import useMoviePosterImageSubmitForm from "@/pages/movies/hooks/admin/poster-image/useMoviePosterImageSubmitForm.ts";
import { MoviePosterImageForm, MoviePosterImageFormValues } from "@/pages/movies/schema/form/MoviePosterImage.types.ts";
import buildStandardLog from "@/common/utility/logger/buildStandardLog.ts";
import MoviePosterImageSubmitFormView
    from "@/pages/movies/components/forms/poster-image/MoviePosterImageSubmitFormView.tsx";

/**
 * Props for `MoviePosterImageSubmitFormContainer`.
 */
type FormProps = FormMutationOnSubmitParams<Movie> & {
    /** The ID of the movie to attach the poster image to */
    movieID: ObjectId;

    /** Optional additional CSS class names for the container */
    className?: string;
};

/**
 * Container component for submitting a movie poster image.
 *
 * Responsibilities:
 * - Initialize the React Hook Form instance for poster image submission.
 * - Set up the mutation via `useMoviePosterImageSubmitMutation` to handle API submission.
 * - Log the submission with `buildStandardLog`.
 * - Pass the form, mutation, and submit handler down to the presentational form view.
 *
 * @param props - FormProps
 */
const MoviePosterImageSubmitFormContainer: FC<FormProps> = (props) => {
    const { movieID, className, ...mutationProps } = props;

    // Initialize the form instance
    const form = useMoviePosterImageSubmitForm();

    // Create the mutation for submitting the poster image
    const mutation = useMoviePosterImageSubmitMutation({ form, movieID, ...mutationProps });

    /**
     * Handles form submission.
     * Logs the submission and triggers the mutation.
     *
     * @param values - Form values from React Hook Form
     */
    const submitPosterImage = (values: MoviePosterImageFormValues) => {
        buildStandardLog({
            msg: "Submit Movie Poster Image Form",
            component: MoviePosterImageSubmitFormContainer.name,
            context: { movie: movieID, values },
        });

        // Safe cast because Zod resolver ensures correct type
        mutation.mutate(values as MoviePosterImageForm);
    };

    return (
        <MoviePosterImageSubmitFormView
            form={form}
            mutation={mutation}
            submitHandler={submitPosterImage}
            className={className}
        />
    );
};

export default MoviePosterImageSubmitFormContainer;
