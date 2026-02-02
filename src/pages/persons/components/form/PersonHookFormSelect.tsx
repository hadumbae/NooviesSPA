import {FC} from 'react';
import {Control} from "react-hook-form";
import HookFormMultiSelect from "@/common/components/forms/select/HookFormMultiSelect.tsx";
import HookFormSelect from "@/common/components/forms/select/HookFormSelect.tsx";
import {Loader} from "lucide-react";
import ReactSelectOption from "@/common/type/input/ReactSelectOption.ts";
import useFetchPersons from "@/pages/persons/hooks/fetch/useFetchPersons.ts";
import {PersonArraySchema} from "@/pages/persons/schema/person/Person.schema.ts";
import {PersonQueryFilters} from "@/pages/persons/schema/queries/PersonQueryOption.types.ts";
import {PersonArray} from "@/pages/persons/schema/person/Person.types.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";

/**
 * Props for the `PersonHookFormSelect` component.
 */
type SelectProps = {
    /** Name of the form field, registered with `react-hook-form`. */
    name: string;

    /** Label displayed above the select input. */
    label: string;

    /** Optional description displayed under the label. */
    description?: string;

    /** Placeholder text shown when no option is selected. */
    placeholder?: string;

    /** React Hook Form control object for this field. */
    control: Control<any>;

    /** Optional query filters to fetch specific subsets of persons. */
    filters?: PersonQueryFilters;

    /**
     * Whether the select should allow multiple selections. Defaults to `false`.
     */
    isMulti?: boolean;
}

/**
 * A form select component for choosing a person or multiple persons.
 *
 * Fetches person data using `useFetchPersons`, validates the response against
 * `PersonArraySchema`, and renders either a single-select or multi-select
 * input connected to `react-hook-form`.
 *
 * Automatically handles loading and error states via `QueryBoundary` and `ValidatedQueryBoundary`.
 *
 * @param props - Component props including field name, label, control, filters, and multi-select flag.
 * @returns A `react-hook-form`-connected select input populated with validated person options.
 *
 * @example
 * ```ts
 * <PersonHookFormSelect
 *   name="manager"
 *   label="Select Manager"
 *   control={form.control}
 *   placeholder="Choose a manager"
 * />
 *
 * <PersonHookFormSelect
 *   name="participants"
 *   label="Select Participants"
 *   control={form.control}
 *   isMulti
 * />
 * ```
 */
const PersonHookFormSelect: FC<SelectProps> = (props) => {
    const {isMulti = false, filters = {}} = props;

    const query = useFetchPersons({queries: filters});

    return (
        <ValidatedDataLoader query={query} schema={PersonArraySchema} loaderComponent={Loader}>
            {(persons: PersonArray) => {
                const options: ReactSelectOption[] = persons.map(
                    ({_id, name}) => ({value: _id, label: name})
                );

                return (
                    isMulti
                        ? <HookFormMultiSelect options={options} {...props} />
                        : <HookFormSelect options={options} {...props} />
                );
            }}
        </ValidatedDataLoader>
    );
};

export default PersonHookFormSelect;
