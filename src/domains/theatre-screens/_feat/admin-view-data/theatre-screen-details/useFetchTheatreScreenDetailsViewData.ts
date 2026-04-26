/**
 * @fileoverview Hook for fetching validated administrative theatre screen details.
 */

import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {
    getFetchTheatreScreenAdminViewData,
    TheatreScreenDetailsViewData, TheatreScreenDetailsViewDataSchema
} from "@/domains/theatre-screens/_feat/admin-view-data";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {TheatreScreenAdminViewDataQueryKeys} from "@/domains/theatre-screens/_feat/admin-view-data/queryKeys.ts";
import {buildQueryFn} from "@/common/features/validate-fetch-data";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

/** Props for the useFetchTheatreScreenDetailsViewData hook. */
type FetchConfig = {
    slugs: {
        theatreSlug: SlugString;
        screenSlug: SlugString;
    },
    options?: FetchQueryOptions<TheatreScreenDetailsViewData>;
}

/**
 * Fetches and validates aggregated theatre, screen, and seat data for the admin details view.
 */
export function useFetchTheatreScreenDetailsViewData(
    {slugs, options}: FetchConfig
): UseQueryResult<TheatreScreenDetailsViewData, HttpResponseError> {
    const fetchViewData = buildQueryFn({
        action: () => getFetchTheatreScreenAdminViewData(slugs),
        schema: TheatreScreenDetailsViewDataSchema,
    });

    return useQuery({
        queryKey: TheatreScreenAdminViewDataQueryKeys.details(slugs),
        queryFn: fetchViewData,
        ...useQueryOptionDefaults(options)
    });
}