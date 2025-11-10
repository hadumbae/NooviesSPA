import {FC} from 'react';
import {SearchParamFormContainerProps} from "@/common/type/form/SearchParamFormProps.ts";
import {PersonQueryOptions} from "@/pages/persons/schema/queries/PersonQueryOption.types.ts";
import usePersonQueryOptionForm from "@/pages/persons/hooks/features/person-query-option/usePersonQueryOptionForm.ts";
import {PersonQueryOptionFormValues} from "@/pages/persons/schema/queries/PersonQueryOptionFormValueSchema.ts";
import useParsedSearchParams from "@/common/hooks/search-params/useParsedSearchParams.ts";
import {PersonQueryOptionsSchema} from "@/pages/persons/schema/queries/PersonQueryOption.schema.ts";
import PersonQueryOptionFormView
    from "@/pages/persons/components/features/admin/person-query-options/PersonQueryOptionFormView.tsx";

/**
 * Props for {@link PersonQueryOptionFormContainer}.
 *
 * @remarks
 * Extends the shared {@link SearchParamFormContainerProps} interface to handle
 * `PersonQueryOptionFormValues` and `PersonQueryOptions`, providing a typed form
 * container for managing person-related query parameters.
 */
type ContainerProps = SearchParamFormContainerProps<PersonQueryOptionFormValues, PersonQueryOptions>;

/**
 * Container component for managing the Person Query Options form.
 *
 * @remarks
 * This component acts as the controller between form state and presentation.
 * It initializes the person query form, synchronizes it with URL search parameters,
 * and renders the {@link PersonQueryOptionFormView} for user interaction.
 *
 * Internally, it:
 * - Initializes a typed form using {@link usePersonQueryOptionForm}.
 * - Syncs form submissions with the browser's query string via {@link useParsedSearchParams}.
 * - Passes configuration props to the form view layer.
 *
 * @param {SearchParamFormContainerProps<PersonQueryOptionFormValues, PersonQueryOptions>} props -
 * Configuration and presentation options for the form container.
 *
 * @property {PersonQueryOptions} [props.presetValues] - Optional preset query values used to populate form defaults.
 * @property {(keyof PersonQueryOptionFormValues)[]} [props.disableFields] - Optional list of field names to disable.
 * @property {string} [props.className] - Optional CSS class name for layout or spacing control.
 *
 * @example
 * ```tsx
 * <PersonQueryOptionFormContainer
 *   presetValues={{ name: "Alice", nationality: "CA" }}
 *   disableFields={["dob"]}
 *   className="space-y-4"
 * />
 * ```
 *
 * @see {@link PersonQueryOptionFormView} - Handles form rendering and UI composition.
 * @see {@link usePersonQueryOptionForm} - Sets up typed form state and validation schema.
 * @see {@link useParsedSearchParams} - Provides synchronization with the browser’s URL parameters.
 */
const PersonQueryOptionFormContainer: FC<ContainerProps> = (props) => {
    const {presetValues, disableFields, className} = props;

    const form = usePersonQueryOptionForm({presetValues});

    const {setSearchParams} = useParsedSearchParams({schema: PersonQueryOptionsSchema});

    const updateSearch = (values: PersonQueryOptionFormValues) => {
        setSearchParams(values as PersonQueryOptions);
    };

    return (
        <PersonQueryOptionFormView
            form={form}
            submitHandler={updateSearch}
            disableFields={disableFields}
            className={className}
        />
    );
};

export default PersonQueryOptionFormContainer;
