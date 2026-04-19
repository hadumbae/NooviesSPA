/**
 * @fileoverview Hook for fetching consolidated genre and movie data for the public UI.
 * Integrates TanStack Query with Zod validation to ensure type-safe data fetching
 * and efficient caching.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import {PaginationValues} from "@/common/features/fetch-pagination-search-params";
import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {buildQueryFn} from "@/common/features/validate-fetch-data";
import {getFetchGenreWithMovies} from "@/domains/genres/_feat/client-view-data/repository.ts";
import {
    BrowseGenreWithMoviesViewData,
    BrowseGenreWithMoviesViewSchema
} from "@/domains/genres/_feat/client-view-data/schemas.ts";
import {GenreClientViewDataQueryKeys} from "@/domains/genres/_feat/client-view-data/GenreClientViewDataQueryKeys.ts";

/**
 * Parameters for the {@link useFetchGenreWithMoviesViewData} hook.
 */
type FetchParams = {
    slug: SlugString;
    moviePagination: PaginationValues;
    options?: FetchQueryOptions<BrowseGenreWithMoviesViewData>;
};

/**
 * Custom hook to fetch a genre and its paginated movies.
 */
export function useFetchGenreWithMoviesViewData(
    {slug, moviePagination, options}: FetchParams
): UseQueryResult<BrowseGenreWithMoviesViewData, HttpResponseError> {
    const {page, perPage} = moviePagination;

    const fetchGenreData = buildQueryFn({
        schema: BrowseGenreWithMoviesViewSchema,
        action: () => getFetchGenreWithMovies({slug, moviePagination}),
    });

    return useQuery({
        queryKey: GenreClientViewDataQueryKeys.withMovies({slug, page, perPage}),
        queryFn: fetchGenreData,
        ...useQueryOptionDefaults(options),
    });
}