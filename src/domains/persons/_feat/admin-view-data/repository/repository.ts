/**
 * @fileoverview Repository for fetching aggregated administrative person data.
 */

import {FetchPersonDetailsViewDataConfig} from "@/domains/persons/_feat/admin-view-data/repository/repository.types.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {PersonDetailsViewData} from "@/domains/persons/_feat/admin-view-data";
import {buildURL} from "@/common/features/fetch-api";
import {PersonAdminViewDataBaseURL} from "@/domains/persons/_feat/admin-view-data/repository/baseURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";

/**
 * Retrieves the composite view data for a person's admin profile.
 */
export async function getFetchPersonDetailsViewData(
    {slug, limit}: FetchPersonDetailsViewDataConfig
): Promise<RequestReturns<PersonDetailsViewData>> {
    const url = buildURL({
        baseURL: PersonAdminViewDataBaseURL,
        path: `/item/${slug}/person-details`,
        queries: {limit},
    });

    return useFetchAPI({method: "GET", url});
}