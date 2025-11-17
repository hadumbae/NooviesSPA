import { FC } from 'react';

import useMovieSubmitForm from "@/pages/movies/hooks/forms/useMovieSubmitForm.ts";
import useMovieSubmitMutation, { MovieSubmitParams } from "@/pages/movies/hooks/mutations/useMovieSubmitMutation.ts";
import MovieSubmitFormView from "@/pages/movies/components/forms/MovieSubmitFormView.tsx";
import { Movie } from "@/pages/movies/schema/movie/Movie.types.ts";
import { MovieForm, MovieFormValues } from "@/pages/movies/schema/form/MovieForm.types.ts";
import { FormContainerProps } from "@/common/type/form/HookFormProps.ts";
import buildFormSubmitLog from "@/common/utility/features/logger/buildFormSubmitLog.ts";

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

    /** Indicates whether the form is rendered inside a panel (e.g., `MovieSubmitFormPanel`). */
    isPanel?: boolean;
};

/**
 * `MovieSubmitFormContainer` is a container component that integrates form state,
 * mutation logic, and presentation for creating or editing `Movie` entities.
 *
 * Features:
 * - Initializes the form with optional preset values or the existing entity (if editing).
 * - Sets up the mutation hook for submitting or updating the movie.
 * - Handles form submission, logging submitted values, and delegating to the mutation.
 * - Renders the `MovieSubmitFormView` with the form instance, submit handler, and mutation state.
 *
 * @param props - Props controlling the form behavior, mutation callbacks, and optional styling.
 * @param props.presetValues - Optional initial values for the form fields.
 * @param props.disableFields - Whether to disable all form inputs.
 * @param props.isEditing - Indicates if the form is editing an existing movie.
 * @param props.entity - The existing movie entity, required if `isEditing` is true.
 * @param props.className - Optional CSS class applied to the container/view.
 * @param props.isPanel - Indicates the form is used inside a panel layout.
 * @param props.* - Additional callbacks and mutation handlers inherited from `FormContainerProps`.
 *
 * @example
 * ```tsx
 * <MovieSubmitFormContainer
 *   isEditing={false}
 *   presetValues={{ title: "", description: "" }}
 *   onSubmitSuccess={(movie) => console.log("Created movie:", movie)}
 * />
 * ```
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

    // ⚡ Form  ⚡

    const form = useMovieSubmitForm({ movie: entity, presetValues });

    // ⚡ Mutation ⚡

    const mutationParams: MovieSubmitParams = isEditing
        ? { ...onSubmitProps, form, isEditing: true, _id: entity._id }
        : { ...onSubmitProps, form, isEditing: false };

    const mutation = useMovieSubmitMutation(mutationParams);

    // ⚡ Handler ⚡

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
