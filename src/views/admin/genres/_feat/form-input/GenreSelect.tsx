/**
 * @fileoverview Form select component for genres integrated with React Hook Form.
 */

import {ReactElement} from "react";
import {FieldValues} from "react-hook-form";
import {HookFormSelect} from "@/views/common/_comp/form-select/HookFormSelect.tsx";
import {ReactSelectOption} from "@/common/_types/input/ReactSelectOption.ts";
import {
    filterNullishAttributes
} from "@/common/_feat/filter-object-attributes/filterNullishAttributes.ts";
import {QueryDataLoader} from "@/views/common/_feat";
import {HookFormInputControlProps} from "@/common/_types/input/HookFormInputProps.ts";
import {generateArraySchema} from "@/common/_feat/validation-builders";
import {Genre, GenreQueryOptions, GenreSchema, useFetchGenres} from "@/domains/genres";

/** Props for the GenreMultiSelect component. */
type SelectProps<TValues extends FieldValues> = Omit<HookFormInputControlProps<TValues>, "control"> & {
    queries?: GenreQueryOptions;
};

/**
 * Fetches genres and renders a single or multi-select input for use within a form.
 */
export function GenreSelect<TValues extends FieldValues>(
    {queries, ...rest}: SelectProps<TValues>
): ReactElement {
    const query = useFetchGenres({
        schema: generateArraySchema(GenreSchema),
        queries: filterNullishAttributes(queries)
    });

    return (
        <QueryDataLoader query={query}>
            {(genres: Genre[]) => {
                const options = genres.map(({_id, name}): ReactSelectOption => ({value: _id, label: name}));

                return (
                    <HookFormSelect options={options} {...rest} />
                );
            }}
        </QueryDataLoader>
    );
}