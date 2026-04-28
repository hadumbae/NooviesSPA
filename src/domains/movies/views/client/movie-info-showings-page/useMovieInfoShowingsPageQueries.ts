/**
 * @file Query definitions for the movie info showings page.
 * @filename useMovieInfoShowingsPageQueries.ts
 */

import useFetchMovieBySlug from "@/domains/movies/_feat/crud-hooks/useFetchMovieBySlug.ts";
import useFetchPaginatedShowings from "@/domains/showings/hooks/queries/useFetchPaginatedShowings.ts";
import { QueryDefinition } from "@/common/type/query/loader/MultiQuery.types.ts";
import {
    ShowingsPageQueryStrings
} from "@/domains/movies/views/client/movie-info-showings-page/schemas/QueryStrings.types.ts";
import { SlugString } from "@/common/schema/strings/simple-strings/SlugString.ts";
import {PaginatedShowingDetailsSchema} from "@/domains/showings/schema/showing/PaginatedShowingSchemas.ts";
import {MovieDetailsSchema} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";

/**
 * Parameters for {@link useMovieInfoShowingsPageQueries}.
 */
type QueryParams = {
    /**
     * Slug identifying the movie to fetch.
     */
    movieSlug: SlugString;

    /**
     * Additional filters applied to the showings query.
     */
    queryOptions: ShowingsPageQueryStrings;

    /**
     * Current showings pagination page.
     */
    showingsPage: number;

    /**
     * Number of showings per page.
     */
    showingsPerPage: number;
};

/**
 * Builds query definitions required by the movie showings page.
 *
 * Returns the queries for:
 * - the movie details
 * - paginated showings for that movie
 *
 * The showings query is constrained to active, scheduled showings
 * and sorted by start time (descending).
 */
export function useMovieInfoShowingsPageQueries(
    { movieSlug, queryOptions, showingsPage, showingsPerPage }: QueryParams
): QueryDefinition[] {
    const movieQuery = useFetchMovieBySlug({
        slug: movieSlug,
        config: { populate: true, virtuals: true },
    });

    const showingQuery = useFetchPaginatedShowings({
        page: showingsPage,
        perPage: showingsPerPage,
        config: { populate: true, virtuals: true },
        queries: {
            ...queryOptions,
            movieSlug: movieSlug,
            status: "SCHEDULED",
            isActive: true,
            sortByStartTime: "desc",
        },
    });

    return [
        {
            key: "movie",
            query: movieQuery,
            schema: MovieDetailsSchema
        },
        {
            key: "paginatedShowings",
            query: showingQuery,
            schema: PaginatedShowingDetailsSchema
        },
    ];
}