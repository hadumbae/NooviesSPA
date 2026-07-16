/**
 * @fileoverview Repository for fetching genre-related client view data.
 */

import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI.ts";
import {GenreClientViewDataBaseURL} from "@/domains/genres/_feat/client-view-data/repository/baseURL.ts";
import {FetchGenreWithMoviesConfig} from "@/domains/genres/_feat/client-view-data/repository/repository.types.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {BrowseGenreWithMoviesViewData} from "@/domains/genres/_feat/client-view-data/schema/schemas.ts";
import {buildURL} from "@/common/_feat/fetch-api";

/** Fetches a specific genre's metadata along with a paginated list of associated movies. */
export function getFetchGenreWithMovies(
    {slug, moviePagination}: FetchGenreWithMoviesConfig
): Promise<RequestReturns<BrowseGenreWithMoviesViewData>> {
    const url = buildURL({
        baseURL: GenreClientViewDataBaseURL,
        path: `/item/${slug}/with-movies`,
        queries: moviePagination,
    });

    return useFetchAPI({
        url,
        method: "GET"
    });
}