import {FC} from 'react';
import {SearchParamFormContainerProps} from "@/common/type/form/SearchParamFormProps.ts";
import {MovieQueryOptionFormValues} from "@/pages/movies/schema/queries/MovieQueryOptionFormValueSchema.ts";
import {MovieQueryOptions} from "@/pages/movies/schema/queries/MovieQueryOption.types.ts";
import useMovieQueryOptionForm
    from "@/pages/movies/hooks/features/admin/movie-query-options/useMovieQueryOptionForm.ts";
import MovieQueryOptionFormView
    from "@/pages/movies/components/features/admin/movie-query-option/MovieQueryOptionFormView.tsx";
import useParsedSearchParams from "@/common/hooks/search-params/useParsedSearchParams.ts";
import {MovieQueryOptionSchema} from "@/pages/movies/schema/queries/MovieQueryOption.schema.ts";
import filterFalsyAttributes from "@/common/utility/collections/filterFalsyAttributes.ts";

/**
 * Defines the props for the {@link MovieQueryOptionFormContainer} component.
 *
 * This type alias specializes the generic {@link SearchParamFormContainerProps} type
 * with concrete types used for movie query options.
 *
 * @typeParam MovieQueryOptionFormValues - The type representing the values managed by the movie query option form.
 * @typeParam MovieQueryOptions - The type representing the valid query parameters applied to movie searches.
 */
type FormContainerProps = SearchParamFormContainerProps<MovieQueryOptionFormValues, MovieQueryOptions>;

/**
 * Container component for managing and submitting the **Movie Query Option** form.
 *
 * @remarks
 * - Provides a wrapper around {@link MovieQueryOptionFormView}.
 * - Initializes the form with {@link useMovieQueryOptionForm}.
 * - Syncs form values with the URL’s search parameters using {@link useParsedSearchParams}.
 * - Filters out falsy values (e.g. `null`, `undefined`, empty strings) before updating
 *   search parameters using {@link filterFalsyAttributes}.
 * - Accepts optional preset values, disabled fields, and class names via props.
 *
 * @example
 * ```tsx
 * <MovieQueryOptionFormContainer
 *   presetValues={{ sortBy: "releaseDate", genre: "Drama" }}
 *   disableFields={false}
 * />
 * ```
 *
 * @see {@link MovieQueryOptionFormView}
 * @see {@link useMovieQueryOptionForm}
 * @see {@link useParsedSearchParams}
 */
const MovieQueryOptionFormContainer: FC<FormContainerProps> = (props) => {
    const {disableFields, className, presetValues} = props;

    // ⚡ Form ⚡
    const form = useMovieQueryOptionForm({presetValues});

    // ⚡ Submit Handler ⚡
    const {setSearchParams} = useParsedSearchParams({schema: MovieQueryOptionSchema, defaultValues: presetValues});

    /**
     * Handles form submission by filtering out falsy attributes and
     * updating the URL search parameters.
     *
     * @param values - The raw form values to be submitted.
     */
    const updateSearchParams = (values: MovieQueryOptionFormValues) => {
        const filtered_values = filterFalsyAttributes(values) as MovieQueryOptions;
        setSearchParams(filtered_values);
    };

    return (
        <MovieQueryOptionFormView
            form={form}
            submitHandler={updateSearchParams}
            className={className}
            disableFields={disableFields}
        />
    );
};

export default MovieQueryOptionFormContainer;
