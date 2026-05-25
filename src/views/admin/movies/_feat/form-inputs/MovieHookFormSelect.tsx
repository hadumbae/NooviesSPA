/**
 * @fileoverview Select component for movie entities integrated with React Hook Form and automated data fetching.
 */

import {FieldValues} from "react-hook-form";
import {Loader} from "lucide-react";
import RequestQueryParams from "@/common/type/request/RequestQueryParams.ts";
import {ReactSelectOption} from "@/common/type/input/ReactSelectOption.ts";
import {HookFormSelect} from "@/views/common/_comp/form-select/HookFormSelect.tsx";
import {HookFormMultiSelect} from "@/views/common/_comp/form-select/HookFormMultiSelect.tsx";
import {ReactElement} from "react";
import {generateArraySchema} from "@/common/_feat/validation-builders";
import {Movie, MovieSchema} from "@/domains/movies/schema/movie";
import {useFetchMovies} from "@/domains/movies/_feat/crud-hooks";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {HookFormInputControlProps} from "@/common/type/input/HookFormInputProps.ts";

/** Props for the MovieHookFormSelect component. */
type SelectProps<TSubmit extends FieldValues> = HookFormInputControlProps<TSubmit> & {
    isMulti?: boolean;
    filters?: RequestQueryParams;
}

/**
 * A form-connected select input that automatically fetches and maps movie data to options.
 */
export function MovieHookFormSelect<TSubmit extends FieldValues>(
    {isMulti = false, filters, ...rest}: SelectProps<TSubmit>
): ReactElement {
    const query = useFetchMovies({schema: generateArraySchema(MovieSchema), queries: filters});

    return (
        <QueryDataLoader query={query} loaderComponent={Loader}>
            {(movies: Movie[]) => {
                /** Transforms movie documents into standardized ReactSelect options. */
                const options: ReactSelectOption[] = movies.map((movie): ReactSelectOption => ({
                    label: movie.title,
                    value: movie._id
                }));

                return (
                    isMulti
                        ? <HookFormMultiSelect<TSubmit> options={options} {...rest} />
                        : <HookFormSelect<TSubmit> options={options} {...rest} />
                );
            }}
        </QueryDataLoader>
    );
}