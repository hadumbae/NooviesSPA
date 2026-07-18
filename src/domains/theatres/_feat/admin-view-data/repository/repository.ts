/**
 * @fileoverview Frontend repository function for fetching Theatre Details view data.
 */

import {
    GetFetchTheatreDetailsViewDataConfig, GetFetchTheatreShowingListViewDataConfig
} from "@/domains/theatres/_feat/admin-view-data/repository/repository.types.ts";
import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns.ts";
import {TheatreDetailsViewData} from "@/domains/theatres/_feat/admin-view-data";
import {buildURL} from "@/common/_feat/fetch-api";
import {TheatreAdminViewDataBaseURL} from "@/domains/theatres/_feat/admin-view-data/repository/baseURL.ts";
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI.ts";
import {
    TheatreShowingListViewData
} from "@/domains/theatres/_feat/admin-view-data/schema/TheatreShowingListViewDataSchema.ts";

/**
 * Fetches the complete dataset required for the Theatre Details admin dashboard.
 */
export function getFetchTheatreDetailsViewData(
    {slug, queries}: GetFetchTheatreDetailsViewDataConfig
): Promise<FetchRequestReturns<TheatreDetailsViewData>> {
    const url = buildURL({
        baseURL: TheatreAdminViewDataBaseURL,
        path: `/item/${slug}/details`,
        queries,
    });

    return useFetchAPI({url: url, method: "GET"});
}

export function getFetchTheatreShowingListViewData(
    {slug, queries}: GetFetchTheatreShowingListViewDataConfig
): Promise<FetchRequestReturns<TheatreShowingListViewData>> {
    const url = buildURL({
        baseURL: TheatreAdminViewDataBaseURL,
        path: `/item/${slug}/showings/list`,
        queries,
    });

    return useFetchAPI({url: url, method: "GET"});
}