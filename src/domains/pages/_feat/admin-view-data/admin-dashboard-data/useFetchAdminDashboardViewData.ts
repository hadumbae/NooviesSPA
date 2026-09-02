/**
 * @fileoverview Custom React Query hook for fetching and validating admin dashboard view metrics.
 */

import {buildQueryFn, useQueryOptionDefaults} from "@/common/_feat";
import {
    getFetchAdminDashboardViewData
} from "@/domains/pages/_feat/admin-view-data/admin-dashboard-data/getFetchAdminDashboardViewData.ts";
import {
    AdminDashboardViewData,
    AdminDashboardViewDataSchema
} from "@/domains/pages/_feat/admin-view-data/admin-dashboard-data/AdminDashboardViewDataSchema.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {FetchQueryOptions} from "@/common/_types";
import {AdminPagesQueryKeys} from "@/domains/pages/_feat/admin-view-data/queryKeys.ts";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";

/** Options for configuring the administrative dashboard query hook. */
type FetchConfig = {
    options?: FetchQueryOptions<AdminDashboardViewData>;
}

/** Fetches and validates runtime schema metrics for the administrative dashboard view. */
export function useFetchAdminDashboardViewData(
    {options}: FetchConfig = {}
): UseQueryResult<AdminDashboardViewData, HttpResponseError> {
    const fetchData = buildQueryFn({
        action: () => getFetchAdminDashboardViewData(),
        schema: AdminDashboardViewDataSchema,
    });

    return useQuery({
        queryKey: AdminPagesQueryKeys.dashboard(),
        queryFn: fetchData,
        ...useQueryOptionDefaults(options),
    });
}