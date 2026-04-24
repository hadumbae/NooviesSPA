/**
 * @fileoverview Custom React Query hook for fetching theatre dashboard data.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {
    getFetchTheatreDetailsViewData,
    TheatreAdminViewDataQueryKeys,
    TheatreDetailsViewData,
    TheatreDetailsViewDataSchema
} from "@/domains/theatres/_feat/admin-view-data";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import {buildQueryFn} from "@/common/features/validate-fetch-data";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

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
        action: () => getFetchTheatreDetailsViewData({slug, ...queries})
    });

    return useQuery({
        queryKey: TheatreAdminViewDataQueryKeys.details({slug, ...queries}),
        queryFn: fetchTheatreDetails,
        ...useQueryOptionDefaults(options),
    });
}