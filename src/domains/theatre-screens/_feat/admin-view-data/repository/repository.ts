/**
 * @fileoverview Data retrieval function for the administrative theatre screen details view.
 */

import {
    FetchTheatreScreenAdminViewDataConfig
} from "@/domains/theatre-screens/_feat/admin-view-data/repository/repository.types.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {TheatreScreenAdminViewDataBaseURL, TheatreScreenDetailsViewData} from "@/domains/theatre-screens/_feat/admin-view-data";
import {buildURL} from "@/common/features/fetch-api";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";

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