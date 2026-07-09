/**
 * @fileoverview Repository for fetching person-related view data for the client-side interface.
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {buildURL} from "@/common/_feat/fetch-api";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import {PersonInfoViewData} from "@/domains/persons/_feat/client-view-data/person-info";
import {PersonClientViewBaseURL} from "@/domains/persons/_feat/client-view-data/repository/baseURL.ts";
import {
    GetFetchBrowsePersonsViewDataConfig,
    GetFetchPersonInfoViewDataConfig,
} from "@/domains/persons/_feat/client-view-data/repository/repository.types.ts";
import {BrowsePersonsViewData} from "@/domains/persons/_feat/client-view-data";

/** Fetches a paginated list of persons for the browse view. */
export async function getFetchBrowsePersonsViewData(
    {page, perPage, queries}: GetFetchBrowsePersonsViewDataConfig
): Promise<RequestReturns<BrowsePersonsViewData>> {
    const url = buildURL({
        baseURL: PersonClientViewBaseURL,
        path: "/browse",
        queries: {page, perPage, ...queries},
    });

    return useFetchAPI({url, method: "GET"});
}

/** Fetches detailed information for a specific person based on their slug. */
export async function getFetchPersonInfoViewData(
    {slug, limit}: GetFetchPersonInfoViewDataConfig
): Promise<RequestReturns<PersonInfoViewData>> {
    const url = buildURL({
        baseURL: PersonClientViewBaseURL,
        path: `/person/${slug}/info`,
        queries: {limit},
    });

    return useFetchAPI({url, method: "GET"});
}