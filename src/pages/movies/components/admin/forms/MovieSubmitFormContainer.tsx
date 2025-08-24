import {FC} from 'react';

import useMovieSubmitForm from "@/pages/movies/hooks/forms/useMovieSubmitForm.ts";
import useMovieSubmitMutation, {MovieSubmitParams} from "@/pages/movies/hooks/mutations/useMovieSubmitMutation.ts";
import MovieSubmitFormView from "@/pages/movies/components/admin/forms/MovieSubmitFormView.tsx";
import {FormMutationOnSubmitParams} from "@/common/type/form/FormMutationResultParams.ts";
import {Movie} from "@/pages/movies/schema/movie/Movie.types.ts";
import {MovieFormValues} from "@/pages/movies/schema/form/MovieForm.types.ts";

/** Props representing editing state for the movie form. */
type EditingProps =
    | { isEditing: true; movie: Movie } // Editing an existing movie
    | { isEditing?: false; movie?: never }; // Creating a new movie

/**
 * Props for {@link MovieSubmitFormContainer}.
 *
 * Extends general form mutation parameters, and adds support for:
 * - Editing state
 * - Optional preset form values
 * - Optional disabled fields
 * - Success and error callbacks
 */
type FormContainerProps =
    Omit<FormMutationOnSubmitParams, "onSubmitSuccess" | "onSubmitError" | "validationSchema"> &
    EditingProps & {
    /** Optional preset values to prefill the form. */
    presetValues?: Partial<MovieFormValues>;
    /** Optional list of fields to disable in the form. */
    disableFields?: (keyof MovieFormValues)[];
    /** Optional callback triggered when form submission succeeds. */
    onSubmitSuccess?: (movie: Movie) => void;
    /** Optional callback triggered when form submission fails. */
    onSubmitError?: (error: unknown) => void;
};

/**
 * Container component for submitting or editing a movie.
 *
 * Handles:
 * - Initializing form values via {@link useMovieSubmitForm}
 * - Managing the submission mutation via {@link useMovieSubmitMutation}
 * - Passing necessary props and handlers to {@link MovieSubmitFormView}
 *
 * @param params - Component props including editing state, preset values, mutation params, and optional callbacks.
 *
 * @example
 * ```tsx
 * <MovieSubmitFormContainer
 *   isEditing={true}
 *   movie={existingMovie}
 *   successMessage="Movie updated successfully!"
 * />
 * ```
 */
const MovieSubmitFormContainer: FC<FormContainerProps> = (params) => {
    const { movie, presetValues, disableFields, isEditing, ...mutationParams } = params;

    // Initialize form with optional preset values or existing movie data
    const form = useMovieSubmitForm({ movie, presetValues });

    // Prepare mutation parameters based on editing state
    const editingParams: MovieSubmitParams = isEditing
        ? { form, isEditing: true, _id: movie._id }
        : { form, isEditing: false };

    const mutation = useMovieSubmitMutation({ ...editingParams, ...mutationParams });

    /** Handler for form submission */
    const onFormSubmit = (values: any) => {
        console.log("Movie Submit Value: ", values);
        mutation.mutate(values);
    };

    return (
        <MovieSubmitFormView
            form={form}
            submitHandler={onFormSubmit}
            mutation={mutation}
            disableFields={disableFields}
        />
    );
};

export default MovieSubmitFormContainer;