/** @fileoverview Container component for the movie submission form, bridging form logic with mutation hooks. */

import {FC} from 'react';

import useMovieSubmitMutation, {MovieSubmitParams} from "@/domains/movies/_feat/crud-hooks/useMovieSubmitMutation.ts";
import MovieSubmitFormView from "@/views/admin/movies/_feat/submit-movie/MovieSubmitFormView.tsx";
import {MovieForm, MovieFormValues} from "@/domains/movies/schema/form/MovieForm.types.ts";
import {FormContainerProps} from "@/common/type/form/HookFormProps.ts";
import buildFormSubmitLog from "@/common/utility/features/logger/buildFormSubmitLog.ts";
import {Movie} from "@/domains/movies/schema/movie/MovieSchema.ts";
import {useMovieSubmitForm} from "@/domains/movies/_feat/submit-data";

/** Props for the MovieSubmitFormContainer component. */
type SubmitFormProps = FormContainerProps<Movie, Movie, MovieFormValues> & {
    className?: string;
    isPanel?: boolean;
};

/**
 * Orchestrates the movie submission process by managing form state and the write mutation.
 */
const MovieSubmitFormContainer: FC<SubmitFormProps> = (props) => {
    const {
        className,
        presetValues,
        disableFields,
        isEditing,
        entity,
        isPanel,
        ...onSubmitProps
    } = props;

    // --- FORM INITIALIZATION ---
    /** Standardized hook to initialize movie-specific form state and validation. */
    const form = useMovieSubmitForm({movie: entity, presetValues});

    // --- MUTATION LOGIC ---
    /** Configures the mutation parameters, identifying if this is a PATCH (edit) or POST (create) request. */
    const mutationParams: MovieSubmitParams = isEditing
        ? {...onSubmitProps, form, isEditing: true, _id: entity!._id}
        : {...onSubmitProps, form, isEditing: false};

    const mutation = useMovieSubmitMutation(mutationParams);

    // --- EVENT HANDLERS ---
    /** Processes the validated form data, logs the payload for debugging, and triggers the mutation. */
    const onFormSubmit = (values: MovieFormValues) => {
        buildFormSubmitLog({
            values,
            msg: "Movie Submit Values",
            component: MovieSubmitFormContainer.name
        });

        mutation.mutate(values as MovieForm);
    };

    return (
        <MovieSubmitFormView
            form={form}
            submitHandler={onFormSubmit}
            mutation={mutation}
            disableFields={disableFields}
            className={className}
            isPanel={isPanel}
        />
    );
};

export default MovieSubmitFormContainer;