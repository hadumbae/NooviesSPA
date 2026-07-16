/**
 * @fileoverview Repository for retrieving administrative view-specific data for Genres.
 *
 */

import {buildURL} from "@/common/_feat/fetch-api";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI.ts";
import {GenreAdminViewDataBaseURL} from "@/domains/genres/_feat/admin-view-data/repository/baseURL.ts";
import {FetchGenreDetailsConfig} from "@/domains/genres/_feat/admin-view-data/repository/repository.types.ts";
import {GenreDetailsViewData} from "@/domains/genres/_feat/admin-view-data/schema";

/** Fetches aggregated genre details and associated movie data from the administrative API. */
export async function getFetchGenreDetails(
    {slug, queries}: FetchGenreDetailsConfig
): Promise<RequestReturns<GenreDetailsViewData>> {
    const url = buildURL({
        baseURL: GenreAdminViewDataBaseURL,
        path: `/item/${slug}/details`,
        queries,
    });

    return useFetchAPI({url, method: "GET"});
}