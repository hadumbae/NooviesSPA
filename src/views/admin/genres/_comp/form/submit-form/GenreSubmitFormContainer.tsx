/**
 * @file Orchestration layer for the Genre creation and edition form.
 * @filename GenreSubmitFormContainer.tsx
 */

import {FC} from 'react';

import useGenreSubmitForm from "@/domains/genres/forms/useGenreSubmitForm.ts";
import useGenreDataSubmit from "@/domains/genres/_feat/crud-hooks/useGenreDataSubmit.ts";

import {GenreForm, GenreFormValues} from "@/domains/genres/schema/form/GenreForm.types.ts";
import GenreSubmitFormView from "@/views/admin/genres/_comp/form/submit-form/GenreSubmitFormView.tsx";
import {FormContainerProps} from "@/common/type/form/HookFormProps.ts";

import {Genre} from "@/domains/genres/schema/genre/GenreSchema.ts";

/**
 * Props for the {@link GenreSubmitFormContainer} component.
 */
type SubmitFormProps =
    FormContainerProps<Genre, Genre, GenreFormValues> & {
    /** Optional CSS class name for the root container. */
    className?: string;
};

/**
 * A logic-only container that wires React Hook Form state to the Genre mutation logic.
 * @param params - Configuration including lifecycle hooks (onSubmitSuccess/Error) and initial entity data.
 */
const GenreSubmitFormContainer: FC<SubmitFormProps> = (params) => {
    const {
        className,
        disableFields,
        presetValues,
        entity,
        ...mutationParams
    } = params;

    const form = useGenreSubmitForm({
        genre: entity,
        presetValues,
    });

    const mutation = useGenreDataSubmit({
        form,
        ...mutationParams,
    });

    const onSubmit = (values: GenreFormValues) => {
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