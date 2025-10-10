import {FC} from 'react';

import useMovieSubmitForm from "@/pages/movies/hooks/forms/useMovieSubmitForm.ts";
import useMovieSubmitMutation, {MovieSubmitParams} from "@/pages/movies/hooks/mutations/useMovieSubmitMutation.ts";
import MovieSubmitFormView from "@/pages/movies/components/forms/MovieSubmitFormView.tsx";
import {Movie} from "@/pages/movies/schema/movie/Movie.types.ts";
import {MovieForm, MovieFormValues} from "@/pages/movies/schema/form/MovieForm.types.ts";
import {FormContainerProps} from "@/common/type/form/HookFormProps.ts";

/**
 * Props for `MovieSubmitFormContainer`.
 *
 * @template TEntity - The entity type managed by the form (here `Movie`).
 * @template TReturn - The type returned by the mutation (here also `Movie`).
 * @template TFormValues - The type of the form values (here `MovieFormValues`).
 */
type SubmitFormProps = FormContainerProps<Movie, Movie, MovieFormValues> & {
    /** Optional CSS class applied to the container or the form view. */
    className?: string;
};

/**
 * Container component that integrates form logic, mutation logic, and the presentation layer
 * for creating or editing `Movie` entities.
 *
 * This component:
 * - Initializes the form with optional preset values or the existing entity (if editing).
 * - Sets up the mutation hook for submitting or updating the movie.
 * - Handles form submission and passes it to the mutation.
 * - Renders the `MovieSubmitFormView` with the form instance and submission handler.
 *
 * @param props - Props controlling the form behavior and mutation callbacks.
 * @param props.presetValues - Optional preset values for initializing the form fields.
 * @param props.disableFields - Flag to disable all form inputs.
 * @param props.isEditing - Whether the form is in edit mode.
 * @param props.entity - The existing movie entity, required if `isEditing` is true.
 * @param props.className - Optional CSS class applied to the container/view.
 * @param props.* - Additional mutation callbacks inherited from `FormContainerProps`.
 */
const MovieSubmitFormContainer: FC<SubmitFormProps> = (props) => {
    const { className, presetValues, disableFields, isEditing, entity, ...onSubmitProps } = props;

    // Initialize the form instance, optionally using preset values or existing entity
    const form = useMovieSubmitForm({ movie: entity, presetValues });

    // Configure mutation parameters based on editing mode
    const mutationParams: MovieSubmitParams = isEditing
        ? { ...onSubmitProps, form, isEditing: true, _id: entity._id }
        : { ...onSubmitProps, form, isEditing: false };

    // Initialize the mutation hook for submitting/updating the movie
    const mutation = useMovieSubmitMutation(mutationParams);

    /**
     * Handles form submission by passing values to the mutation.
     * The mutation internally manages success and error handling.
     *
     * @param values - The current form values to submit.
     */
    const onFormSubmit = (values: MovieFormValues) => {
        console.log("Movie Submit Value: ", values);
        mutation.mutate(values as MovieForm);
    };

    return (
        <MovieSubmitFormView
            form={form}
            submitHandler={onFormSubmit}
            mutation={mutation}
            disableFields={disableFields}
            className={className}
        />
    );
};

export default MovieSubmitFormContainer;
