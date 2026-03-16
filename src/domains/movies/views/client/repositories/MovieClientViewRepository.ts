/**
 * @file Client repository for retrieving movie view data.
 * @filename MovieClientViewRepository.ts
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import {
    GetCreditsForMovieViewParams,
    GetShowingsForMovieViewParams
} from "@/domains/movies/views/client/repositories/MovieClientViewRepository.types.ts";

const baseURL = `${import.meta.env.VITE_API_URL}/api/v1/views/${import.meta.env.VITE_DEV_CLIENT_NAME}/client/movies`;

/**
 * Retrieves grouped movie credits.
 */
const getCreditsForMovieView = (
    {slug}: GetCreditsForMovieViewParams
): Promise<RequestReturns> => {
    const url = buildQueryURL({
        baseURL,
        path: `${slug}/credits`
    });

    return useFetchAPI({url, method: "GET"});
};

/**
 * Retrieves paginated showings for a movie.
 */
const getShowingsForMovieView = (
    {slug, queries}: GetShowingsForMovieViewParams
): Promise<RequestReturns> => {
    const url = buildQueryURL({
        baseURL,
        path: `${slug}/showings`,
        queries
    });

    return useFetchAPI({url, method: "GET"});
};

export {
    getCreditsForMovieView,
    getShowingsForMovieView,
};