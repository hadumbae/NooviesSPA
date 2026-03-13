/**
 * @file Client repository for fetching movie view data from the API.
 * @filename MovieClientViewRepository.ts
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import {GetCreditsForMovieViewParams} from "@/domains/movies/views/client/repositories/MovieClientViewRepository.types.ts";

const baseURL = `${import.meta.env.VITE_API_URL}/api/v1/views/${import.meta.env.VITE_DEV_CLIENT_NAME}/client/movies`;

/**
 * Fetches grouped credits for a movie view.
 */
const getCreditsForMovieView = (
    {slug}: GetCreditsForMovieViewParams
): Promise<RequestReturns> => {
    const url = buildQueryURL({
        baseURL,
        path: `${slug}/credits`
    });

    return useFetchAPI({url, method: "GET"});
}

export {
    getCreditsForMovieView,
}