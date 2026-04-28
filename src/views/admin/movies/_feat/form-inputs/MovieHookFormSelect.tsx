/** @fileoverview Select component for movie entities integrated with React Hook Form and automated data fetching. */

import {Control, FieldValues, Path} from "react-hook-form";
import {Loader} from "lucide-react";

import RequestQueryParams from "@/common/type/request/RequestQueryParams.ts";
import ReactSelectOption from "@/common/type/input/ReactSelectOption.ts";

import HookFormSelect from "@/common/components/forms/select/HookFormSelect.tsx";
import HookFormMultiSelect from "@/common/components/forms/select/HookFormMultiSelect.tsx";
import useFetchMovies from "@/domains/movies/_feat/crud-hooks/useFetchMovies.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {MovieArray, MovieArraySchema} from "@/domains/movies/schema/movie/MovieArraySchema.ts";
import {ReactElement} from "react";

/** Props for the MovieHookFormSelect component. */
type SelectProps<TSubmit extends FieldValues> = {
    name: Path<TSubmit>;
    label: string;
    description?: string;
    placeholder?: string;
    control: Control<TSubmit>;
    isMulti?: boolean;
    filters?: RequestQueryParams;
}

/** * A form-connected select input that automatically fetches, validates, and maps movie data to options.
 * Supports both single and multi-select modes via the `isMulti` prop.
 */
export function MovieHookFormSelect<TSubmit extends FieldValues>(props: SelectProps<TSubmit>): ReactElement {
    const {isMulti = false, filters = {}} = props;
    const query = useFetchMovies({queries: filters});

    return (
        <ValidatedDataLoader query={query} schema={MovieArraySchema} loaderComponent={Loader}>
            {(movies: MovieArray) => {
                /** Transforms movie documents into standardized ReactSelect options. */
                const options: ReactSelectOption[] = movies.map((movie): ReactSelectOption => ({
                    label: movie.title,
                    value: movie._id
                }));

                return (
                    isMulti
                        ? <HookFormMultiSelect<TSubmit> options={options} {...props} />
                        : <HookFormSelect<TSubmit> options={options} {...props} />
                );
            }}
        </ValidatedDataLoader>
    );
}