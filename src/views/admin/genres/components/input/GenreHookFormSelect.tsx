/**
 * @file React Hook Form genre select component backed by a genre query.
 * @filename GenreHookFormSelect.tsx
 */

import { Control, FieldValues, Path } from "react-hook-form";
import HookFormMultiSelect from "@/common/components/forms/select/HookFormMultiSelect.tsx";
import HookFormSelect from "@/common/components/forms/select/HookFormSelect.tsx";
import ReactSelectOption from "@/common/type/input/ReactSelectOption.ts";
import useFetchGenres from "@/domains/genres/fetch/useFetchGenres.ts";
import { GenreQueryOptions } from "@/domains/genres/schema/filters/GenreQueryOptions.types.ts";
import filterNullishAttributes from "@/common/utility/collections/filterNullishAttributes.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {GenreArray, GenreArraySchema} from "@/domains/genres/schema/genre/GenreArraySchema.ts";

/**
 * Props for {@link GenreHookFormSelect}.
 *
 * @template TValues - Form values managed by react-hook-form.
 */
type SelectProps<TValues extends FieldValues> = {
    /**
     * Field name within the form schema.
     */
    name: Path<TValues>;

    /**
     * Input label.
     */
    label: string;

    /**
     * Optional helper text displayed below the input.
     */
    description?: string;

    /**
     * Placeholder when no value is selected.
     */
    placeholder?: string;

    /**
     * React Hook Form control used to register the field.
     */
    control: Control<TValues>;

    /**
     * Optional query parameters used when fetching genres.
     */
    queries?: GenreQueryOptions;

    /**
     * Enables multi-select mode.
     *
     * @defaultValue false
     */
    isMulti?: boolean;

    /**
     * Optional container class.
     */
    className?: string;
};

/**
 * Form select component for choosing genres.
 *
 * Fetches genres via {@link useFetchGenres}, validates the result with
 * {@link GenreArraySchema}, and renders either a single or multi-select
 * input depending on {@link SelectProps.isMulti}.
 *
 * @template TValues - Form values managed by react-hook-form.
 */
const GenreHookFormSelect = <TValues extends FieldValues>(props: SelectProps<TValues>) => {
    const { isMulti = false, queries = {} } = props;
    const query = useFetchGenres({ queries: filterNullishAttributes(queries) });

    return (
        <ValidatedDataLoader query={query} schema={GenreArraySchema}>
            {(genres: GenreArray) => {
                const options = genres.map(({ _id, name }): ReactSelectOption => ({
                    value: _id,
                    label: name,
                }));

                return (
                    isMulti
                        ? <HookFormMultiSelect options={options} {...props} />
                        : <HookFormSelect options={options} {...props} />
                );
            }}
        </ValidatedDataLoader>
    );
};

export default GenreHookFormSelect;