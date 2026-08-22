/**
 * @fileoverview Form select input component for selecting person entities.
 */

import {ReactElement} from "react";
import {HookFormInputControlProps, ReactSelectOption, RequestOptions} from "@/common/_types";
import {Person, PersonQueryFilters, PersonSchema, useFetchPersons} from "@/domains/persons";
import {generateArraySchema} from "@/common/_feat";
import {QueryDataLoader} from "@/views/common/_feat";
import {AnimatedLoader, HookFormSelect} from "@/views/common/_comp";
import {FieldValues} from "react-hook-form";

/** Props for the PersonFormSelect component. */
type SelectProps<TFormValues extends FieldValues> = Omit<HookFormInputControlProps<TFormValues>, "control"> & {
    filters?: Partial<PersonQueryFilters>;
    config?: RequestOptions;
};

/**
 * Renders a form select input pre-populated with fetched person options.
 */
export function PersonFormSelect<TFormValues extends FieldValues>(
    {filters, config, ...inputProps}: SelectProps<TFormValues>
): ReactElement {
    const query = useFetchPersons({
        schema: generateArraySchema(PersonSchema),
        queries: filters,
        config,
    });

    return (
        <QueryDataLoader query={query} loaderComponent={AnimatedLoader}>
            {(persons: Person[]) => {
                const options = persons.map((p): ReactSelectOption => ({value: p._id, label: p.name}));

                return (
                    <HookFormSelect
                        {...inputProps}
                        options={options}
                    />
                )
            }}
        </QueryDataLoader>
    );
}