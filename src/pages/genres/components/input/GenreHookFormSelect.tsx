import { Control, FieldValues, Path } from "react-hook-form";
import HookFormMultiSelect from "@/common/components/forms/select/HookFormMultiSelect.tsx";
import HookFormSelect from "@/common/components/forms/select/HookFormSelect.tsx";
import ReactSelectOption from "@/common/type/input/ReactSelectOption.ts";
import useFetchGenres from "@/pages/genres/hooks/fetch-data/useFetchGenres.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import { GenreArraySchema } from "@/pages/genres/schema/genre/Genre.schema.ts";
import { GenreArray } from "@/pages/genres/schema/genre/Genre.types.ts";
import { GenreQueryOptions } from "@/pages/genres/schema/filters/GenreQueryOptions.types.ts";
import filterNullishAttributes from "@/common/utility/collections/filterNullishAttributes.ts";

/**
 * Props for {@link GenreHookFormSelect}.
 *
 * @template TValues - Type of form values managed by react-hook-form.
 */
type SelectProps<TValues extends FieldValues> = {
    /**
     * Name of the field in the form.
     * This must correspond to a valid key in `TValues`.
     */
    name: Path<TValues>;

    /**
     * Human-readable label displayed above the select input.
     */
    label: string;

    /**
     * Optional description or helper text displayed under the input.
     */
    description?: string;

    /**
     * Placeholder text when no value is selected.
     */
    placeholder?: string;

    /**
     * React Hook Form `control` instance used to bind the select component to the form.
     */
    control: Control<TValues>;

    /**
     * Optional query parameters passed to the genre fetcher hook.
     */
    queries?: GenreQueryOptions;

    /**
     * Whether the select allows multiple selections.
     * Defaults to `false`.
     */
    isMulti?: boolean;

    /**
     * Optional Tailwind class name for layout customization.
     */
    className?: string;
};

/**
 * A reusable form select component for selecting one or more movie genres.
 *
 * This component integrates with **react-hook-form** and automatically fetches available genres
 * from the backend. It validates and normalizes the fetched data before rendering either a single
 * or multi-select input depending on the `isMulti` flag.
 *
 * @template TValues - The form data type used with react-hook-form.
 *
 * @example
 * ```tsx
 * <GenreHookFormSelect<MyFormValues>
 *   name="genres"
 *   label="Select Genres"
 *   control={form.control}
 *   isMulti
 * />
 * ```
 *
 * @remarks
 * - Fetches data using {@link useFetchGenres}.
 * - Wraps content in {@link QueryBoundary} and {@link ValidatedQueryBoundary} for data safety.
 * - Validates query results against {@link GenreArraySchema}.
 * - Maps each genre to a {@link ReactSelectOption} compatible with react-select components.
 */
const GenreHookFormSelect = <TValues extends FieldValues>(props: SelectProps<TValues>) => {
    const { isMulti = false, queries = {} } = props;
    const query = useFetchGenres({queries: filterNullishAttributes(queries)});

    return (
        <QueryBoundary query={query}>
            <ValidatedQueryBoundary query={query} schema={GenreArraySchema}>
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
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default GenreHookFormSelect;
