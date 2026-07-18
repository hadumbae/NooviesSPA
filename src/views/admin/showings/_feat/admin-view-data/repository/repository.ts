/**
 * @fileoverview Repository for fetching composite view data for the showing administration interface.
 */

import {
    GetFetchShowingDetailsViewDataConfig
} from "@/views/admin/showings/_feat/admin-view-data/repository/repository.types.ts";
import {ShowingDetailsViewData} from "@/views/admin/showings/_feat/admin-view-data/schema";
import {buildURL} from "@/common/_feat/fetch-api";
import {ShowingAdminViewDataBaseURL} from "@/views/admin/showings/_feat/admin-view-data/repository/baseURL.ts";
import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns.ts";
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI.ts";

/** Fetches detailed view data for a specific showing by its slug. */
export async function getFetchShowingDetailsViewData(
    {slug}: GetFetchShowingDetailsViewDataConfig
): Promise<FetchRequestReturns<ShowingDetailsViewData>> {
    const url = buildURL({
        baseURL: ShowingAdminViewDataBaseURL,
        path: `/item/${slug}/details`,
    });

    return useFetchAPI({url, method: "GET"});
}