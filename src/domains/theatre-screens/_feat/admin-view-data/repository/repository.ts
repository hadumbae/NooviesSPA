/**
 * @fileoverview Data retrieval function for the administrative theatre screen details view.
 */

import {buildURL} from "@/common/_feat/fetch-api";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI.ts";

import {
    TheatreScreenAdminViewDataBaseURL,
} from "@/domains/theatre-screens/_feat/admin-view-data/repository/baseURL.ts";
import {
    TheatreScreenDetailsViewData
} from "@/domains/theatre-screens/_feat/admin-view-data/theatre-screen-details/viewDataSchema.ts";
import {
    FetchTheatreScreenAdminViewDataConfig
} from "@/domains/theatre-screens/_feat/admin-view-data/repository/repository.types.ts";

/**
 * Retrieves the aggregated theatre, screen, and seat data for a specific screen from the API.
 */
export async function getFetchTheatreScreenAdminViewData(
    {theatreSlug, screenSlug}: FetchTheatreScreenAdminViewDataConfig
): Promise<RequestReturns<TheatreScreenDetailsViewData>> {
    const url = buildURL({
        baseURL: TheatreScreenAdminViewDataBaseURL,
        path: `/theatre/${theatreSlug}/screen/${screenSlug}/details`,
    });

    return useFetchAPI({url, method: "GET"});
}