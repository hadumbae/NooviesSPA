/**
 * @fileoverview Select component for movie entities integrated with React Hook Form and automated data fetching.
 */

import {FieldValues} from "react-hook-form";
import {Loader} from "lucide-react";
import {ReactSelectOption} from "@/common/_types/input/ReactSelectOption.ts";
import {HookFormSelect} from "@/views/common/_comp/form-select/HookFormSelect.tsx";
import {ReactElement} from "react";
import {generateArraySchema} from "@/common/_feat/validation-builders";
import {Movie, MovieSchema} from "@/domains/movies/_schema/movie";
import {useFetchMovies} from "@/domains/movies/_feat/crud-hooks";
import {QueryDataLoader} from "@/views/common/_feat";
import {HookFormInputControlProps} from "@/common/_types/input/HookFormInputProps.ts";
import {MovieQueryFilters} from "@/domains/movies";

/** Props for the MovieHookFormSelect component. */
type SelectProps<TSubmit extends FieldValues> = Omit<HookFormInputControlProps<TSubmit>, "control"> & {
    filters?: MovieQueryFilters;
}

/**
 * A form-connected select input that automatically fetches movie data and maps it to options.
 */
export function MovieHookFormSelect<TSubmit extends FieldValues>(
    {filters, ...rest}: SelectProps<TSubmit>
): ReactElement {
    const query = useFetchMovies({schema: generateArraySchema(MovieSchema), queries: filters});

    return (
        <QueryDataLoader query={query} loaderComponent={Loader}>
            {(movies: Movie[]) => {
                const options: ReactSelectOption[] = movies.map((movie): ReactSelectOption => ({
                    label: movie.title,
                    value: movie._id
                }));

                return (
                    <HookFormSelect<TSubmit> options={options} {...rest} />
                );
            }}
        </QueryDataLoader>
    );
}