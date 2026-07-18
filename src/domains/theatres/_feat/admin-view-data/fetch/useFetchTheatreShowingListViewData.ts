/**
 * @fileoverview Custom React Query hook for fetching paginated theatre showing list data.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";
import {FetchQueryOptions} from "@/common/_types/fetch-queries/FetchQueryOptions.ts";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {useQueryOptionDefaults} from "@/common/_feat/handle-query/useQueryOptionDefaults.ts";
import {getFetchTheatreShowingListViewData} from "@/domains/theatres/_feat/admin-view-data/repository";
import {TheatreAdminViewDataQueryKeys,} from "@/domains/theatres/_feat/admin-view-data/fetch/queryKeys.ts";
import {
    TheatreShowingListViewData,
    TheatreShowingListViewDataSchema
} from "@/domains/theatres/_feat/admin-view-data/schema";

/** Configuration for the useFetchTheatreShowingListViewData hook. */
type FetchConfig = {
    slug: string;
    options?: FetchQueryOptions<TheatreShowingListViewData>;
    queries?: {
        page?: number;
        perPage?: number;
    };
};

/**
 * Fetches and validates paginated showing data and theatre context for the admin list view.
 */
export function useFetchTheatreShowingListViewData(
    {slug, queries, options}: FetchConfig
): UseQueryResult<TheatreShowingListViewData, HttpResponseError> {
    const fetchShowingList = buildQueryFn<TheatreShowingListViewData>({
        schema: TheatreShowingListViewDataSchema,
        action: () => getFetchTheatreShowingListViewData({slug, queries})
    });

    return useQuery({
        queryKey: TheatreAdminViewDataQueryKeys.showingList({slug, ...queries}),
        queryFn: fetchShowingList,
        ...useQueryOptionDefaults(options),
    });
}