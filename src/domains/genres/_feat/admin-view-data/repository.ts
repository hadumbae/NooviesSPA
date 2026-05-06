/**
 * @fileoverview Repository for retrieving administrative view-specific data for Genres.
 * Handles the construction of requests to specialized "view-data" endpoints that
 * aggregate genre metadata with nested collections (e.g., movies).
 */

import {FetchGenreDetailsConfig} from "@/domains/genres/_feat/admin-view-data/repository.types.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import {GenreAdminViewDataBaseURL} from "@/domains/genres/_feat/admin-view-data/baseURL.ts";
import {buildURL} from "@/common/features/fetch-api";

/**
 * Fetches aggregated genre details and associated movie data from the administrative API.
 */
export const getFetchGenreDetails = async (
    {slug, queries}: FetchGenreDetailsConfig
) => {
    const url = buildURL({
        baseURL: GenreAdminViewDataBaseURL,
        path: `/item/${slug}/details`,
        queries,
    });

    return useFetchAPI({url, method: "GET"});
};