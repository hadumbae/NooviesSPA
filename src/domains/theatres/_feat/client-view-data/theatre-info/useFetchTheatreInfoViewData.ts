/**
 * @fileoverview Hook for fetching and validating theatre information and schedule data for the client view.
 */

import {DateOnlyString} from "@/common/_schemas/dates/DateOnlyStringSchema.ts";
import {SlugString} from "@/common/_schemas/strings/slug-strings/SlugString.ts";
import {FetchQueryOptions} from "@/common/_types/fetch-queries/FetchQueryOptions.ts";
import {TheatreClientViewQueryKeys,} from "@/domains/theatres/_feat/client-view-data/queryKeys.ts";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {useQueryOptionDefaults} from "@/common/_feat/handle-query/useQueryOptionDefaults.ts";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";
import {
    TheatreInfoViewData,
    TheatreInfoViewDataSchema
} from "@/domains/theatres/_feat/client-view-data/theatre-info/TheatreInfoViewDataSchema.ts";
import {
    getFetchTheatreInfoViewData
} from "@/domains/theatres/_feat/client-view-data/theatre-info/getFetchTheatreInfoViewData.ts";

/** Configuration for fetching theatre information view data. */
type FetchConfig = {
    theatreSlug: SlugString;
    localDateString: DateOnlyString;
    options?: FetchQueryOptions<TheatreInfoViewData>;
    queries?: {
        limit?: number;
    };
}

/** Fetches and validates the composite data required for the theatre information view. */
export function useFetchTheatreInfoViewData(
    {theatreSlug, localDateString, queries, options}: FetchConfig
): UseQueryResult<TheatreInfoViewData, HttpResponseError> {
    const fetchViewData = buildQueryFn({
        action: () => getFetchTheatreInfoViewData({theatreSlug, localDateString, queries}),
        schema: TheatreInfoViewDataSchema,
    });

    return useQuery({
        queryKey: TheatreClientViewQueryKeys.browseInfo({theatreSlug, localDateString, ...queries}),
        queryFn: fetchViewData,
        ...useQueryOptionDefaults(options),
    });
}