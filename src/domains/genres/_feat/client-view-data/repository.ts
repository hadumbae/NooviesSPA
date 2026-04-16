/**
 * @fileoverview Repository for retrieving public client-facing data for Genres.
 * Handles the communication with specialized view-data endpoints that provide
 * aggregated content for specific UI layouts.
 */

import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import {GenreClientViewDataBaseURL} from "@/domains/genres/_feat/client-view-data/baseURL.ts";
import {FetchGenreWithMoviesConfig} from "@/domains/genres/_feat/client-view-data/repository.types.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {BrowseGenreWithMoviesViewData} from "@/domains/genres/_feat/client-view-data/schemas.ts";

/**
 * Fetches a specific genre's metadata along with a paginated list of associated movies.
 */
export function getFetchGenreWithMovies(
    {slug, moviePagination}: FetchGenreWithMoviesConfig
): Promise<RequestReturns<BrowseGenreWithMoviesViewData>> {
    const url = buildQueryURL({
        baseURL: GenreClientViewDataBaseURL,
        path: `item/${slug}/with-movies`,
        queries: moviePagination,
    });

    return useFetchAPI({
        url,
        method: "GET"
    });
}