/**
 * @fileoverview Container component for the movie submission form, bridging form logic with mutation hooks.
 */

import {FC} from 'react';

import MovieSubmitFormView from "@/views/admin/movies/_feat/submit-movie/MovieSubmitFormView.tsx";
import {FormContainerProps} from "@/common/type/form/HookFormProps.ts";
import buildFormSubmitLog from "@/common/utility/features/logger/buildFormSubmitLog.ts";
import {Movie} from "@/domains/movies/schema/movie/MovieSchema.ts";
import {useMovieSubmitForm} from "@/domains/movies/_feat/submit-data";
import {MovieFormData} from "@/domains/movies/_feat/submit-data";

import {MovieFormStarterValues} from "@/domains/movies/_feat/submit-data";
import {useMovieSubmitMutation} from "@/domains/movies/_feat/crud-hooks";

/** Props for the MovieSubmitFormContainer component. */
type SubmitFormProps = FormContainerProps<Movie, Movie, MovieFormStarterValues> & {
    className?: string;
    isPanel?: boolean;
};

/** Orchestrates the movie submission process by managing form state and the write mutation. */
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
    const form = useMovieSubmitForm({movie: entity, presetValues});
    const mutation = useMovieSubmitMutation({form, ...onSubmitProps});

    // --- EVENT HANDLERS ---
     const onFormSubmit = (values: MovieFormStarterValues) => {
        buildFormSubmitLog({
            values,
            msg: "Movie Submit Values",
            component: MovieSubmitFormContainer.name
        });

        mutation.mutate(values as MovieFormData);
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