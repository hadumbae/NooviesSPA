/**
 * @fileoverview Custom React Query hook for fetching paginated theatre showing list data.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {
    TheatreAdminViewDataQueryKeys,
} from "@/domains/theatres/_feat/admin-view-data";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import {buildQueryFn} from "@/common/features/validate-fetch-data";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {
    TheatreShowingListViewData, TheatreShowingListViewDataSchema
} from "@/domains/theatres/_feat/admin-view-data/schemas/TheatreShowingListViewDataSchema.ts";
import {getFetchTheatreShowingListViewData} from "@/domains/theatres/_feat/admin-view-data/repository/repository.ts";

/** Configuration for the useFetchTheatreShowingListViewData hook. */
type FetchConfig = {
    slug: string;
    queries?: {
        page?: number;
        perPage?: number;
    };
    options?: FetchQueryOptions<TheatreShowingListViewData>;
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