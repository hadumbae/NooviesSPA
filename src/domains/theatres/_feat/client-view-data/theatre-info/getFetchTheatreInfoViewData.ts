/**
 * @fileoverview API fetch function for retrieving composite theatre info and screen data for client views.
 */

import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns";
import {TheatreInfoViewData} from "@/domains/theatres/_feat/client-view-data/theatre-info/TheatreInfoViewDataSchema";
import {buildURL} from "@/common/_feat/fetch-api/buildURL";
import {TheatreClientViewBaseURL} from "@/domains/theatres/_feat/client-view-data/repository/baseURL";
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI";
import {SlugString} from "@/common/_schemas/strings/slug-strings/SlugString";
import {DateOnlyString} from "@/common/_schemas/dates/DateOnlyStringSchema";

/** Parameters for fetching theatre information view data. */
export type GetFetchTheatreInfoViewDataConfig = {
    theatreSlug: SlugString;
    localDateString: DateOnlyString;
    queries?: {
        limit?: number;
    };
};

/** Retrieves theatre information along with screen data for a specific date. */
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