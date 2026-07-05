/**
 * @fileoverview Repository for fetching person-related view data for the client-side interface.
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {buildURL} from "@/common/_feat/fetch-api";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import {
    PersonInfoViewData
} from "@/domains/persons/_feat/client-view-data";
import {PersonClientViewBaseURL} from "@/domains/persons/_feat/client-view-data";
import {GetFetchPersonInfoViewDataConfig,
} from "@/domains/persons/_feat/client-view-data";

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