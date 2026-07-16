/**
 * @fileoverview Fetches screen data for client-side views.
 */

import {buildURL} from "@/common/_feat/fetch-api";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI.ts";

import {TheatreScreenSchedule} from "@/domains/theatre-screens/_schema";
import {ScreenBrowseBaseURL} from "@/domains/theatre-screens/_feat/client-view-data/repository/baseURL.ts";
import {
    FetchScreensWithShowingsConfig
} from "@/domains/theatre-screens/_feat/client-view-data/repository/repository.types.ts";

/**
 * Fetches screens with their scheduled showings from the API.
 */
export function fetchScreensWithShowings(
    {theatreID, localDate}: FetchScreensWithShowingsConfig
): Promise<RequestReturns<TheatreScreenSchedule[]>> {
    const url = buildURL({
        baseURL: ScreenBrowseBaseURL,
        path: `/showings-by-screen/theatre/${theatreID}/date/${localDate}`,
    });

    return useFetchAPI({method: "GET", url});
}