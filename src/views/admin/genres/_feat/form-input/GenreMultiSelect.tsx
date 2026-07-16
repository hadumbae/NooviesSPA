/**
 * @fileoverview React Hook Form genre multi-select component backed by a genre query.
 */

import {FieldValues} from "react-hook-form";
import {HookFormMultiSelect} from "@/views/common/_comp/form-select/HookFormMultiSelect.tsx";
import {ReactSelectOption} from "@/common/type/input/ReactSelectOption.ts";
import {
    filterNullishAttributes
} from "@/common/_feat/filter-object-attributes/filterNullishAttributes.ts";
import {ReactElement} from "react";
import {QueryDataLoader} from "@/views/common/_feat/loaders/QueryDataLoader.tsx";
import {HookFormInputControlProps} from "@/common/type/input/HookFormInputProps.ts";
import {useFetchGenres, GenreQueryOptions, GenreSchema, Genre} from "@/domains/genres";
import {generateArraySchema} from "@/common/_feat/validation-builders";

/** Props for the GenreMultiSelect component. */
type SelectProps<TValues extends FieldValues> = Omit<HookFormInputControlProps<TValues>, "control"> & {
    queries?: GenreQueryOptions;
};

/**
 * Form select component that fetches genres and renders a multi-select input.
 */
export function GenreMultiSelect<TValues extends FieldValues>(
    {queries, ...rest}: SelectProps<TValues>
): ReactElement {
    const query = useFetchGenres({
        schema: generateArraySchema(GenreSchema),
        queries: filterNullishAttributes(queries),
    });

    return (
        <QueryDataLoader query={query}>
            {(genres: Genre[]) => {
                const options = genres.map(({_id, name}): ReactSelectOption => ({value: _id, label: name}));

                return (
                    <HookFormMultiSelect options={options} {...rest} />
                );
            }}
        </QueryDataLoader>
    );
}