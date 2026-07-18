/**
 * @fileoverview Hook for fetching consolidated genre and movie data for the public UI.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {FetchQueryOptions} from "@/common/_types/fetch-queries/FetchQueryOptions.ts";
import {PaginationValues} from "@/common/_feat/fetch-pagination-search-params";
import {SlugString} from "@/common/_schemas/strings/slug-strings/SlugString.ts";
import {useQueryOptionDefaults} from "@/common/_feat/handle-query/useQueryOptionDefaults.ts";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {getFetchGenreWithMovies} from "@/domains/genres/_feat/client-view-data/repository/repository.ts";
import {
    BrowseGenreWithMoviesViewData,
    BrowseGenreWithMoviesViewSchema
} from "@/domains/genres/_feat/client-view-data/schema/schemas.ts";
import {GenreClientViewDataQueryKeys} from "@/domains/genres/_feat/client-view-data/fetch/GenreClientViewDataQueryKeys.ts";

/** Parameters for the useFetchGenreWithMoviesViewData hook. */
type FetchParams = {
    slug: SlugString;
    moviePagination: PaginationValues;
    options?: FetchQueryOptions<BrowseGenreWithMoviesViewData>;
};

/**
 * Fetches and validates a genre and its paginated movies for the client view.
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