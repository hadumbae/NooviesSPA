import {FC} from 'react';

import useGenreSubmitForm from "@/pages/genres/hooks/useGenreSubmitForm.ts";
import useGenreSubmitMutation from "@/pages/genres/hooks/useGenreSubmitMutation.ts";

import {GenreForm, GenreFormValues} from "@/pages/genres/schema/form/GenreForm.types.ts";
import {Genre} from "@/pages/genres/schema/genre/Genre.types.ts";
import {FormMutationEditingParams, FormMutationOnSubmitParams} from "@/common/type/form/FormMutationResultParams.ts";
import GenreSubmitFormView from "@/pages/genres/components/form/GenreSubmitFormView.tsx";

/**
 * Props for configuring the genre submission form.
 *
 * Extends `FormMutationOnSubmitParams` except `onSubmitSuccess` is overridden
 * to require a strongly typed `Genre` on success.
 *
 * Supports both creation and editing modes, determined by the presence of the `genre` prop.
 */
type SubmitFormProps =
    Omit<FormMutationOnSubmitParams, "onSubmitSuccess"> &
    {
        /**
         * Callback invoked when the genre submission succeeds.
         * @param genre - The successfully created or updated genre.
         */
        onSubmitSuccess: (genre: Genre) => void;

        /**
         * Optional CSS class applied to the form container.
         */
        className?: string;

        /**
         * Existing genre being edited.
         * When provided, the form will populate with its values.
         */
        genre?: Genre;

        /**
         * Array of field keys that should be disabled in the form.
         */
        disableFields?: (keyof GenreFormValues)[];

        /**
         * Partial preset values to initialize the form fields.
         * These will override default values if provided.
         */
        presetValues?: Partial<GenreFormValues>;
    };

/**
 * Container component for submitting or editing a genre.
 *
 * This component handles:
 * - Initializing the genre form with optional preset or existing genre values.
 * - Determining editing mode based on the presence of a `genre` prop.
 * - Managing the submission process through a mutation hook.
 * - Rendering the presentational form view component.
 *
 * @param {SubmitFormProps} params - The props for configuring the genre submission form.
 *
 * @example
 * ```tsx
 * <GenreSubmitFormContainer
 *   onSubmitSuccess={(genre) => console.log("Saved:", genre)}
 *   successMessage="Genre saved successfully!"
 *   genre={existingGenre}
 *   disableFields={["name"]}
 * />
 * ```
 */
const GenreSubmitFormContainer: FC<SubmitFormProps> = (params) => {
    const {genre, className, disableFields, presetValues, ...mutationParams} = params;

    const form = useGenreSubmitForm({genre, presetValues});

    const editingParams: FormMutationEditingParams = genre
        ? {isEditing: true, _id: genre._id}
        : {isEditing: false};

    const mutation = useGenreSubmitMutation({
        form,
        ...mutationParams,
        ...editingParams,
    });

    const onSubmit = (values: GenreFormValues) => {
        console.log("Genre Form Values: ", values);
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
