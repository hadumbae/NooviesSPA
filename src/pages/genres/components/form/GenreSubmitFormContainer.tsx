/**
 * @file GenreSubmitFormContainer.tsx
 *
 * Container component for the genre create/edit form.
 *
 * Responsibilities:
 * - Initialize React Hook Form state for genre submission
 * - Configure and execute create/update mutations
 * - Coordinate submission lifecycle callbacks
 * - Delegate rendering to {@link GenreSubmitFormView}
 *
 * This component contains no presentational logic and serves purely
 * as the orchestration layer between form state, mutation logic,
 * and UI rendering.
 */

import {FC} from 'react';

import useGenreSubmitForm from "@/pages/genres/hooks/submit-data/useGenreSubmitForm.ts";
import useGenreSubmitMutation from "@/pages/genres/hooks/submit-data/useGenreSubmitMutation.ts";

import {GenreForm, GenreFormValues} from "@/pages/genres/schema/form/GenreForm.types.ts";
import {Genre, GenreDetails} from "@/pages/genres/schema/genre/Genre.types.ts";
import GenreSubmitFormView from "@/pages/genres/components/form/GenreSubmitFormView.tsx";
import {FormContainerProps} from "@/common/type/form/HookFormProps.ts";

/**
 * Props for {@link GenreSubmitFormContainer}.
 *
 * @remarks
 * Extends {@link FormContainerProps} with optional layout concerns.
 * All submission lifecycle callbacks and entity context are inherited.
 */
type SubmitFormProps =
    FormContainerProps<GenreDetails, Genre, GenreFormValues> & {
    /** Optional CSS class name for the form container. */
    className?: string;
};

/**
 * **GenreSubmitFormContainer**
 *
 * Container component responsible for wiring together:
 * - Form state initialization
 * - Mutation lifecycle handling
 * - Submission orchestration
 *
 * @remarks
 * This component:
 * - Initializes React Hook Form state via {@link useGenreSubmitForm}
 * - Selects create vs update mode based on `entity?._id`
 * - Delegates rendering to {@link GenreSubmitFormView}
 *
 * No presentational logic is handled here.
 *
 * @example
 * ```tsx
 * <GenreSubmitFormContainer
 *   entity={genre}
 *   onSubmitSuccess={refreshGenres}
 * />
 * ```
 */
const GenreSubmitFormContainer: FC<SubmitFormProps> = (params) => {
    const {
        className,
        disableFields,
        presetValues,
        entity,
        ...mutationParams
    } = params;

    /** Initializes the React Hook Form instance for genre submission. */
    const form = useGenreSubmitForm({
        genre: entity,
        presetValues,
    });

    /** Configures the genre submit mutation (create or update). */
    const mutation = useGenreSubmitMutation({
        form,
        editID: entity?._id,
        ...mutationParams,
    });

    /** Handles validated form submission and triggers the mutation. */
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
