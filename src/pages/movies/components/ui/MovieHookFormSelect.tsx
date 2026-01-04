import {Control, FieldValues, Path} from "react-hook-form";
import {Loader} from "lucide-react";

import RequestQueryParams from "@/common/type/request/RequestQueryParams.ts";
import ReactSelectOption from "@/common/type/input/ReactSelectOption.ts";

import HookFormSelect from "@/common/components/forms/select/HookFormSelect.tsx";
import HookFormMultiSelect from "@/common/components/forms/select/HookFormMultiSelect.tsx";
import ErrorMessageDisplay from "@/common/components/errors/ErrorMessageDisplay.tsx";
import {MovieArraySchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import {MovieArray} from "@/pages/movies/schema/movie/Movie.types.ts";
import useFetchMovies from "@/pages/movies/hooks/queries/useFetchMovies.ts";

/**
 * Props for the `MovieHookFormSelect` component.
 *
 * @template TSubmit - The type of the form values used with `react-hook-form`.
 */
type SelectProps<TSubmit extends FieldValues> = {
    /** Name of the field in the form, registered with `react-hook-form`. */
    name: Path<TSubmit>;

    /** Label displayed above the select input. */
    label: string;

    /** Optional description displayed below the label. */
    description?: string;

    /** Placeholder text displayed when no option is selected. */
    placeholder?: string;

    /** `react-hook-form` control object for this field. */
    control: Control<TSubmit>;

    /**
     * Whether to render a multi-select. Defaults to `false` for single-select.
     */
    isMulti?: boolean;

    /** Optional query filters applied when fetching movie options. */
    filters?: RequestQueryParams;
}

/**
 * A reusable `react-hook-form` select component for choosing movies.
 *
 * Fetches a list of movies using `useFetchAllMovies`, validates the response
 * against `MovieArraySchema`, and renders either a single or multi-select
 * field. Handles loading and error states automatically.
 *
 * @template TSubmit - The type of the form values managed by `react-hook-form`.
 * @param props - Component props including form control, field name, label, and optional filters.
 * @returns A `react-hook-form`-connected select input populated with movie options.
 *
 * @example
 * ```ts
 * <MovieHookFormSelect
 *   name="favoriteMovie"
 *   label="Select your favorite movie"
 *   control={form.control}
 *   placeholder="Choose a movie"
 * />
 * ```
 */
const MovieHookFormSelect = <TSubmit extends FieldValues>(props: SelectProps<TSubmit>) => {
    const {isMulti = false, filters = {}} = props;
    const query = useFetchMovies({queries: filters});

    return (
        <QueryBoundary
            query={query}
            loaderComponent={Loader}
            errorComponent={ErrorMessageDisplay}
        >
            <ValidatedQueryBoundary
                query={query}
                schema={MovieArraySchema}
                loaderComponent={Loader}
                errorComponent={ErrorMessageDisplay}
            >
                {(movies: MovieArray) => {
                    const options: ReactSelectOption[] = movies.map(
                        (movie): ReactSelectOption => ({label: movie.title, value: movie._id}),
                    );

                    return (
                        isMulti
                            ? <HookFormMultiSelect<TSubmit> options={options} {...props} />
                            : <HookFormSelect<TSubmit> options={options} {...props} />
                    );
                }}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default MovieHookFormSelect;
