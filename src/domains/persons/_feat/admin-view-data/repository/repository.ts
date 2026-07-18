/**
 * @fileoverview Repository for fetching aggregated administrative person data.
 */

import {FetchPersonDetailsViewDataConfig} from "@/domains/persons/_feat/admin-view-data/repository/repository.types.ts";
import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns.ts";
import {PersonDetailsViewData} from "@/domains/persons/_feat/admin-view-data";
import {buildURL} from "@/common/_feat/fetch-api";
import {PersonAdminViewDataBaseURL} from "@/domains/persons/_feat/admin-view-data/repository/baseURL.ts";
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI.ts";

/**
 * Retrieves the composite view data for a person's admin profile.
 */
export async function getFetchPersonDetailsViewData(
    {slug, limit}: FetchPersonDetailsViewDataConfig
): Promise<FetchRequestReturns<PersonDetailsViewData>> {
    const url = buildURL({
        baseURL: PersonAdminViewDataBaseURL,
        path: `/item/${slug}/person-details`,
        queries: {limit},
    });

    return useFetchAPI({method: "GET", url});
}