/**
 * @file Composes the query definitions required to hydrate the Genre Details page.
 * @filename useGenreDetailsPageQueries.ts
 */

import useFetchGenreBySlug from "@/domains/genres/fetch/useFetchGenreBySlug.ts";
import useFetchPaginatedMovies from "@/domains/movies/hooks/queries/useFetchPaginatedMovies.ts";
import {QueryDefinition} from "@/common/type/query/loader/MultiQuery.types.ts";

import {PaginatedMovieDetailsSchema} from "@/domains/movies/schema/movie/PaginatedMovieDetailsSchema.ts";

import {GenreSchema} from "@/domains/genres/schema/genre/GenreSchema.ts";

/**
 * Parameters for the {@link useGenreDetailsPageQueries} hook.
 */
type HookParams = {
    /** Configuration for identifying the specific genre. */
    genreConfig: {
        slug: string;
    };
    /** Pagination parameters for the associated movies list. */
    movieConfig: {
        page: number;
        perPage: number;
    };
};

/**
 * Orchestrates multiple data fetches for the Genre Details view.
 * @param params - Configuration for slug and pagination state.
 * @returns A structured array of query definitions for the page loader.
 */
export default function useGenreDetailsPageQueries(
    params: HookParams
): QueryDefinition[] {
    const {
        genreConfig: {slug},
        movieConfig: {page, perPage},
    } = params;

    /** Retrieves the specific genre details with full relationship population. */
    const genreQuery = useFetchGenreBySlug({
        slug,
        config: {populate: true, virtuals: true},
    });

    /** Retrieves the list of movies associated with this genre context. */
    const movieQuery = useFetchPaginatedMovies({
        page,
        perPage,
        config: {populate: true, virtuals: true},
    });

    return [
        {key: "genre", query: genreQuery, schema: GenreSchema},
        {key: "movies", query: movieQuery, schema: PaginatedMovieDetailsSchema},
    ];
}