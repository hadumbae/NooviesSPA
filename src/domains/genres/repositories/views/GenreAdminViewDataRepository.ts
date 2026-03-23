/**
 * @file Repository for retrieving administrative view-specific data for Genres.
 * @filename GenreAdminViewDataRepository.ts
 */

import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import {FetchGenreDetailsParams} from "@/domains/genres/repositories/views/GenreAdminViewDataRepository.types.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";

/** Base endpoint for genre-related administrative view data. */
const baseURL = `${import.meta.env.VITE_API_URL}/api/v1/admin/genres/view-data`;

/**
 * Fetches aggregated genre details and associated movie data from the administrative API.
 * @param params - Configuration containing the target genre slug and pagination/filter queries.
 * @returns A promise resolving to the aggregated genre and movie data.
 */
export const getFetchGenreDetails = async (
    {slug, queries}: FetchGenreDetailsParams
) => {
    const url = buildQueryURL({
        baseURL,
        path: `item/${slug}/details`,
        queries,
    });

    return useFetchAPI({url, method: "GET"});
}