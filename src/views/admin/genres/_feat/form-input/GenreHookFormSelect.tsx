/**
 * @fileoverview React Hook Form genre select component backed by a genre query.
 */

import {Control, FieldValues, Path} from "react-hook-form";
import HookFormMultiSelect from "@/common/components/forms/select/HookFormMultiSelect.tsx";
import HookFormSelect from "@/common/components/forms/select/HookFormSelect.tsx";
import ReactSelectOption from "@/common/type/input/ReactSelectOption.ts";
import useFetchGenres from "@/domains/genres/_feat/crud-hooks/useFetchGenres.ts";
import {GenreQueryOptions} from "@/domains/genres/schema/filters/GenreQueryOptions.types.ts";
import filterNullishAttributes from "@/common/utility/collections/filterNullishAttributes.ts";
import {GenreArray, GenreArraySchema} from "@/domains/genres/schema/genre/GenreArraySchema.ts";
import {ReactElement} from "react";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";

/**
 * Props for GenreHookFormSelect.
 */
type SelectProps<TValues extends FieldValues> = {
    name: Path<TValues>;
    label: string;
    description?: string;
    placeholder?: string;
    control: Control<TValues>;
    queries?: GenreQueryOptions;
    isMulti?: boolean;
    className?: string;
};

/**
 * Form select component that fetches genres and renders a single or multi-select input.
 */
export function GenreHookFormSelect<TValues extends FieldValues>(
    props: SelectProps<TValues>
): ReactElement {
    const {isMulti = false, queries = {}} = props;

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
                    ? <HookFormMultiSelect options={options} {...props} />
                    : <HookFormSelect options={options} {...props} />;
            }}
        </QueryDataLoader>
    );
}