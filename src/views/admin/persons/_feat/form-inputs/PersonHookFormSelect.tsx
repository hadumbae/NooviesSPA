/**
 * @fileoverview A specialized form select component for Person entities.
 * Integrates with `react-hook-form` and TanStack Query to provide a
 * data-driven selection interface with built-in validation.
 */

import {FC} from 'react';
import {Control} from "react-hook-form";
import HookFormMultiSelect from "@/common/components/forms/select/HookFormMultiSelect.tsx";
import HookFormSelect from "@/common/components/forms/select/HookFormSelect.tsx";
import {Loader} from "lucide-react";
import ReactSelectOption from "@/common/type/input/ReactSelectOption.ts";
import {PersonArraySchema} from "@/domains/persons/schema/person/Person.schema.ts";
import {PersonQueryFilters} from "@/domains/persons/schema/query-options/PersonQueryOption.types.ts";
import {PersonArray} from "@/domains/persons/schema/person/Person.types.ts";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {useFetchPersons} from "@/domains/persons/_feat/crud-hooks";

/**
 * Props for the {@link PersonHookFormSelect} component.
 */
type SelectProps = {
    name: string;
    label: string;
    description?: string;
    placeholder?: string;
    control: Control<any>;
    filters?: PersonQueryFilters;
    isMulti?: boolean;
}

/**
 * An automated Select/Multi-Select component for picking Persons.
 */
const PersonHookFormSelect: FC<SelectProps> = (props) => {
    const {isMulti = false, filters = {}} = props;

    const query = useFetchPersons({
        schema: PersonArraySchema,
        queries: filters
    });

    return (
        <QueryDataLoader
            query={query}
            loaderComponent={Loader}
        >
            {(persons: PersonArray) => {
                /** Transforms the raw Person domain objects into standard Select options. */
                const options: ReactSelectOption[] = persons.map(
                    ({_id, name}) => ({value: _id, label: name})
                );

                return isMulti ? (
                    <HookFormMultiSelect options={options} {...props} />
                ) : (
                    <HookFormSelect options={options} {...props} />
                );
            }}
        </QueryDataLoader>
    );
};

export default PersonHookFormSelect;