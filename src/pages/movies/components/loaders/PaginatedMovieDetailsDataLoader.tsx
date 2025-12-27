/**
 * @file PaginatedMovieDetailsDataLoader.tsx
 * @description
 * Data loader component that fetches paginated movie details,
 * validates the response schema, and renders via render-props.
 */

import useFetchPaginatedMovies from "@/pages/movies/hooks/queries/useFetchPaginatedMovies.ts";
import {MovieQueryOptions} from "@/pages/movies/schema/queries/MovieQueryOption.types.ts";
import {PaginationValues} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";
import filterNullishAttributes from "@/common/utility/collections/filterNullishAttributes.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {PaginatedMovieDetailsSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {PaginatedMovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import {ReactNode} from "react";

/**
 * Props for {@link PaginatedMovieDetailsDataLoader}.
 *
 * Combines pagination values, movie query options,
 * and a render-prop child for consuming validated data.
 */
type LoaderProps = PaginationValues & MovieQueryOptions & {
    /**
     * Render function invoked with validated paginated movie data.
     */
    children: (data: PaginatedMovieDetails) => ReactNode;
};

/**
 * Fetches paginated movie data with query options,
 * validates the result against {@link PaginatedMovieDetailsSchema},
 * and renders children using a render-prop pattern.
 *
 * @param props Pagination, query options, and render function
 *
 * @example
 * ```tsx
 * <PaginatedMovieDetailsDataLoader page={1} perPage={20}>
 *   {(data) => <MovieGrid movies={data.items} />}
 * </PaginatedMovieDetailsDataLoader>
 * ```
 */
const PaginatedMovieDetailsDataLoader = (props: LoaderProps) => {
    const {children, page, perPage, ...queries} = props;

    console.log("Page: ", page);
    console.log("Per Page: ", perPage);

    const query = useFetchPaginatedMovies({
        page,
        perPage,
        queries: filterNullishAttributes(queries),
        queryConfig: {populate: true, virtuals: true},
    });

    return (
        <ValidatedDataLoader query={query} schema={PaginatedMovieDetailsSchema}>
            {children}
        </ValidatedDataLoader>
    );
};

export default PaginatedMovieDetailsDataLoader;
