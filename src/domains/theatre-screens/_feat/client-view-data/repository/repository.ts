/**
 * @fileoverview Fetches screen data for client-side views.
 */

import {FetchScreensWithShowingsConfig,} from "./repository.types.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {ScreenBrowseBaseURL} from "@/domains/theatre-screens/_feat/client-view-data";
import {buildURL} from "@/common/features/fetch-api";
import {ScreenWithShowings} from "@/domains/theatre-screens/schema/model";

/**
 * Fetches screens with their scheduled showings from the API.
 */
export function fetchScreensWithShowings(
    { theatreID, localDate }: FetchScreensWithShowingsConfig
): Promise<RequestReturns<ScreenWithShowings[]>> {
    const url = buildURL({
        baseURL: ScreenBrowseBaseURL,
        path: `/showings-by-screen/theatre/${theatreID}/date/${localDate}`,
    });

    return useFetchAPI({ method: "GET", url });
}