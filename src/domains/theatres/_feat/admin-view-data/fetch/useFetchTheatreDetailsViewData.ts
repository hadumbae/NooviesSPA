/**
 * @fileoverview Custom React Query hook for fetching theatre dashboard data.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {useQueryOptionDefaults} from "@/common/_feat/handle-query/useQueryOptionDefaults.ts";
import {TheatreAdminViewDataQueryKeys} from "@/domains/theatres/_feat/admin-view-data/fetch/queryKeys";
import {getFetchTheatreDetailsViewData} from "@/domains/theatres/_feat/admin-view-data/repository";
import {TheatreDetailsViewData, TheatreDetailsViewDataSchema} from "@/domains/theatres/_feat/admin-view-data/schema";

/** Configuration for the useFetchTheatreDetailsViewData hook. */
type FetchConfig = {
    slug: string;
    queries?: {
        screenPage?: number;
        screenPerPage?: number;
        showingLimit?: number;
    };
    options?: FetchQueryOptions<TheatreDetailsViewData>;
};

/**
 * Fetches and validates composite data for the Theatre Details admin view.
 */
export function useFetchTheatreDetailsViewData(
    {slug, queries, options}: FetchConfig
): UseQueryResult<TheatreDetailsViewData, HttpResponseError> {
    const fetchTheatreDetails = buildQueryFn<TheatreDetailsViewData>({
        schema: TheatreDetailsViewDataSchema,
        action: () => getFetchTheatreDetailsViewData({slug, queries})
    });

    return useQuery({
        queryKey: TheatreAdminViewDataQueryKeys.details({slug, ...queries}),
        queryFn: fetchTheatreDetails,
        ...useQueryOptionDefaults(options),
    });
}