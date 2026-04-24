/**
 * @fileoverview Frontend repository function for fetching Theatre Details view data.
 */

import {
    GetFetchTheatreDetailsViewDataConfig, GetFetchTheatreShowingListViewDataConfig
} from "@/domains/theatres/_feat/admin-view-data/repository/repository.types.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {TheatreDetailsViewData} from "@/domains/theatres/_feat/admin-view-data";
import {buildURL} from "@/common/features/fetch-api";
import {TheatreAdminViewDataBaseURL} from "@/domains/theatres/_feat/admin-view-data/repository/baseURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import {
    TheatreShowingListViewData
} from "@/domains/theatres/_feat/admin-view-data/schemas/TheatreShowingListViewDataSchema.ts";

/**
 * Fetches the complete dataset required for the Theatre Details admin dashboard.
 */
export function getFetchTheatreDetailsViewData(
    {slug, queries}: GetFetchTheatreDetailsViewDataConfig
): Promise<RequestReturns<TheatreDetailsViewData>> {
    const url = buildURL({
        baseURL: TheatreAdminViewDataBaseURL,
        path: `/item/${slug}/details`,
        queries,
    });

    return useFetchAPI({url: url, method: "GET"});
}

export function getFetchTheatreShowingListViewData(
    {slug, queries}: GetFetchTheatreShowingListViewDataConfig
): Promise<RequestReturns<TheatreShowingListViewData>> {
    const url = buildURL({
        baseURL: TheatreAdminViewDataBaseURL,
        path: `/item/${slug}/showings/list`,
        queries,
    });

    return useFetchAPI({url: url, method: "GET"});
}