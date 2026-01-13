/**
 * @file useGenreDetailsPageQueries.ts
 *
 * Composes the query definitions required for the Genre Details page.
 *
 * Responsibilities:
 * - Fetch the target genre by slug
 * - Fetch paginated movies associated with the genre
 * - Attach runtime schemas for multi-query validation
 */

import useFetchGenreBySlug from "@/pages/genres/hooks/fetch-data/useFetchGenreBySlug.ts";
import useFetchPaginatedMovies from "@/pages/movies/hooks/queries/useFetchPaginatedMovies.ts";
import {QueryDefinition} from "@/common/type/query/loader/MultiQuery.types.ts";
import {GenreDetailsSchema} from "@/pages/genres/schema/genre/Genre.schema.ts";
import {PaginatedMovieDetailsSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";

/**
 * Parameters for {@link useGenreDetailsPageQueries}.
 */
type HookParams = {
    /** Genre identifier configuration. */
    genreConfig: {
        slug: string;
    };
    /** Pagination configuration for movies. */
    movieConfig: {
        page: number;
        perPage: number;
    };
};

/**
 * **useGenreDetailsPageQueries**
 *
 * Returns the query definitions needed to hydrate the Genre Details page
 * using a multi-query loader.
 *
 * Queries:
 * - `genre` — fetches genre details by slug
 * - `movies` — fetches paginated movies for the genre
 *
 * Validation:
 * - Each query is paired with its runtime schema
 *
 * @param params - {@link HookParams}
 *
 * @returns Ordered {@link QueryDefinition} array.
 */
export default function useGenreDetailsPageQueries(
    params: HookParams
): QueryDefinition[] {
    const {
        genreConfig: {slug},
        movieConfig: {page, perPage},
    } = params;

    const genreQuery = useFetchGenreBySlug({
        slug,
        config: {populate: true, virtuals: true},
    });

    const movieQuery = useFetchPaginatedMovies({
        page,
        perPage,
        config: {populate: true, virtuals: true},
    });

    return [
        {key: "genre", query: genreQuery, schema: GenreDetailsSchema},
        {key: "movies", query: movieQuery, schema: PaginatedMovieDetailsSchema},
    ];
}
