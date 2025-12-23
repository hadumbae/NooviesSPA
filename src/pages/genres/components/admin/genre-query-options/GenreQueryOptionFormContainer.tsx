import {FC} from 'react';
import {GenreQueryOptions} from "@/pages/genres/schema/filters/GenreQueryOptions.types.ts";
import useGenreQueryOptionForm from "@/pages/genres/hooks/use-query-options/useGenreQueryOptionForm.ts";
import useGenreQueryOptionSearchParams
    from "@/pages/genres/hooks/use-query-options/useGenreQueryOptionSearchParams.ts";
import {GenreQueryOptionFormValues} from "@/pages/genres/schema/filters/GenreQueryOptionForm.types.ts";
import GenreQueryOptionFormView from "@/pages/genres/components/admin/genre-query-options/GenreQueryOptionFormView.tsx";
import {FormOptions} from "@/common/type/form/HookFormProps.ts";

/**
 * Props for {@link GenreQueryOptionFormContainer}.
 */
type ContainerProps = FormOptions<GenreQueryOptionFormValues> & {
    /**
     * Optional custom class name for applying additional styling
     * or layout configuration to the form container.
     */
    className?: string;
}

/**
 * `GenreQueryOptionFormContainer` is a logic controller component that
 * coordinates the genre query option form’s behavior, state, and interaction
 * with URL search parameters.
 *
 * It handles form initialization, change detection, automatic submission,
 * and syncing of query options with the browser’s URL.
 *
 * @component
 * @example
 * ```tsx
 * <GenreQueryOptionFormContainer
 *   presetValues={{ name: "Drama", sortByName: "asc" }}
 *   disableFields={["sortByName"]}
 * />
 * ```
 *
 * @param {ContainerProps} props - The props for configuring the form container.
 * @returns {JSX.Element} A container component that manages form logic
 * and renders the {@link GenreQueryOptionFormView} presentation layer.
 *
 * @see {@link GenreQueryOptionFormView} - Handles the UI layout and form rendering.
 * @see {@link useGenreQueryOptionForm} - Hook responsible for setting up the form schema, validation, and defaults.
 * @see {@link useGenreQueryOptionSearchParams} - Hook for managing genre query options via URL search parameters.
 */
const GenreQueryOptionFormContainer: FC<ContainerProps> = (props) => {
    const {presetValues, disableFields, className} = props;

    // Hook that provides methods for reading/writing genre query options to the URL.
    const {setSearchParams} = useGenreQueryOptionSearchParams();

    // Initializes the form with schema validation and preset defaults.
    const form = useGenreQueryOptionForm({presetValues});

    /**
     * Handles submission of the form.
     * Updates the URL search parameters to reflect the current form values.
     *
     * @param {GenreQueryOptionFormValues} values - The validated form data.
     */
    const onSubmit = (values: GenreQueryOptionFormValues) => {
        setSearchParams(values as GenreQueryOptions);
    }

    return (
        <GenreQueryOptionFormView
            form={form}
            submitHandler={onSubmit}
            disableFields={disableFields}
            className={className}
        />
    );
};

export default GenreQueryOptionFormContainer;
