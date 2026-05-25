/**
 * @fileoverview React Hook Form genre select component backed by a genre query.
 */

import {FieldValues} from "react-hook-form";
import {HookFormMultiSelect} from "@/views/common/_comp/form-select/HookFormMultiSelect.tsx";
import {HookFormSelect} from "@/views/common/_comp/form-select/HookFormSelect.tsx";
import {ReactSelectOption} from "@/common/type/input/ReactSelectOption.ts";
import useFetchGenres from "@/domains/genres/_feat/crud-hooks/useFetchGenres.ts";
import filterNullishAttributes from "@/common/utility/collections/filterNullishAttributes.ts";
import {GenreArray, GenreArraySchema} from "@/domains/genres/schema/genre/GenreArraySchema.ts";
import {ReactElement} from "react";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {GenreQueryOptions} from "@/domains/genres/schema";
import {HookFormInputControlProps} from "@/common/type/input/HookFormInputProps.ts";

/**
 * Props for GenreHookFormSelect.
 */
type SelectProps<TValues extends FieldValues> = HookFormInputControlProps<TValues> & {
    queries?: GenreQueryOptions;
    isMulti?: boolean;
};

/**
 * Form select component that fetches genres and renders a single or multi-select input.
 */
export function GenreHookFormSelect<TValues extends FieldValues>(
    {isMulti = false, queries, ...rest}: SelectProps<TValues>
): ReactElement {
    const query = useFetchGenres({
        schema: GenreArraySchema,
        queries: filterNullishAttributes(queries)
    });

    return (
        <QueryDataLoader query={query}>
            {(genres: GenreArray) => {
                const options = genres.map(({_id, name}): ReactSelectOption => ({
                    value: _id,
                    label: name,
                }));

                return isMulti
                    ? <HookFormMultiSelect options={options} {...rest} />
                    : <HookFormSelect options={options} {...rest} />;
            }}
        </QueryDataLoader>
    );
}