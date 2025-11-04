import { FC } from 'react';

import useGenreSubmitForm from "@/pages/genres/hooks/useGenreSubmitForm.ts";
import useGenreSubmitMutation from "@/pages/genres/hooks/useGenreSubmitMutation.ts";

import { GenreForm, GenreFormValues } from "@/pages/genres/schema/form/GenreForm.types.ts";
import { Genre } from "@/pages/genres/schema/genre/Genre.types.ts";
import GenreSubmitFormView from "@/pages/genres/components/form/GenreSubmitFormView.tsx";
import { MutationEditByIDParams } from "@/common/type/form/MutationSubmitParams.ts";
import { FormContainerProps } from "@/common/type/form/HookFormProps.ts";

/**
 * Props for the {@link GenreSubmitFormContainer} component.
 *
 * @remarks
 * Extends {@link FormContainerProps} to configure a genre form container
 * with optional class styling and field disabling behavior.
 *
 * @property className - Optional CSS class name for styling the form container.
 */
type SubmitFormProps = FormContainerProps<Genre, Genre, GenreFormValues> & {
    className?: string;
};

/**
 * Handles form state, mutation logic, and submission for the genre form.
 *
 * @remarks
 * This container component composes form setup and mutation logic:
 * - Initializes form state using {@link useGenreSubmitForm}.
 * - Configures mutation behavior through {@link useGenreSubmitMutation}.
 * - Passes all necessary handlers and state to {@link GenreSubmitFormView}.
 *
 * It supports both **create** and **edit** operations, automatically determining
 * mode based on the `isEditing` flag and the provided `entity` object.
 *
 * @example
 * ```tsx
 * <GenreSubmitFormContainer
 *   isEditing={true}
 *   entity={genre}
 *   onSuccess={refreshGenres}
 * />
 * ```
 */
const GenreSubmitFormContainer: FC<SubmitFormProps> = (params) => {
    const { className, disableFields, presetValues, isEditing, entity, ...mutationParams } = params;

    /** Initializes the React Hook Form instance for genre submission. */
    const form = useGenreSubmitForm({ genre: entity, presetValues });

    /** Determines mutation parameters based on edit mode. */
    const editingParams: MutationEditByIDParams = isEditing === true
        ? { isEditing: true, _id: entity!._id }
        : { isEditing: false };

    /** Creates a mutation handler for submitting the genre form. */
    const mutation = useGenreSubmitMutation({ form, ...mutationParams, ...editingParams });

    /** Handles validated form submission and triggers the mutation. */
    const onSubmit = (values: GenreFormValues) => {
        console.log("Genre Form Values:", values);
        mutation.mutate(values as GenreForm);
    };

    return (
        <GenreSubmitFormView
            form={form}
            submitHandler={onSubmit}
            mutation={mutation}
            disableFields={disableFields}
            className={className}
        />
    );
};

export default GenreSubmitFormContainer;
