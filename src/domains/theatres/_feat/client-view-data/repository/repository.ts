/**
 * @fileoverview Repository for fetching theatre information and screen data for the client view.
 */

import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns.ts";
import {TheatreClientViewBaseURL, TheatreInfoViewData} from "@/domains/theatres/_feat/client-view-data";
import {GetFetchTheatreInfoViewDataConfig} from "@/domains/theatres/_feat/client-view-data/repository/repository.types.ts";
import {buildURL} from "@/common/_feat/fetch-api";
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI.ts";

/**
 * Retrieves theatre information along with screen data for a specific date.
 */
export function getFetchTheatreInfoViewData(
    {theatreSlug, localDateString, queries}: GetFetchTheatreInfoViewDataConfig
): Promise<FetchRequestReturns<TheatreInfoViewData>> {
    const url = buildURL({
        baseURL: TheatreClientViewBaseURL,
        path: `/theatre/${theatreSlug}/info-with-screens/${localDateString}`,
        queries,
    });

    return useFetchAPI({method: "GET", url});
}