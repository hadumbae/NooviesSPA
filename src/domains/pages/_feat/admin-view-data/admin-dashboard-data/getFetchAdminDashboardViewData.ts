/**
 * @fileoverview Data fetching utility for retrieving administrative dashboard view metrics.
 */

import {FetchRequestReturns} from "@/common/_types";
import {
    AdminDashboardViewData
} from "@/domains/pages/_feat/admin-view-data/admin-dashboard-data/AdminDashboardViewDataSchema.ts";
import {buildURL, useFetchAPI} from "@/common/_feat";
import {AdminPageViewDataBaseURL} from "@/domains/pages/_feat/admin-view-data/baseURL.ts";

/** Fetches aggregated analytics view data for the admin dashboard. */
export async function getFetchAdminDashboardViewData(): Promise<FetchRequestReturns<AdminDashboardViewData>> {
    const url = buildURL({
        baseURL: AdminPageViewDataBaseURL,
        path: "/dashboard-data",
    });

    return useFetchAPI({url, method: "GET"});
}