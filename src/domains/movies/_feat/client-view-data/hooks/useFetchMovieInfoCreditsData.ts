/**
 * @fileoverview Hook for fetching and validating movie credit information for the client view.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {SlugString} from "@/common/_schemas/strings/SlugString.ts";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {getFetchMovieInfoCreditsViewData} from "@/domains/movies/_feat/client-view-data/repository";
import {MovieClientViewDataQueryKeys} from "@/domains/movies/_feat/client-view-data/hooks/queryKeys.ts";
import {MovieInfoCreditViewData, MovieInfoCreditViewSchema} from "@/domains/movies/_feat/client-view-data/schemas";

/** Parameters for fetching movie info credits data. */
export type FetchParams = {
    slug: SlugString;
    options?: FetchQueryOptions<MovieInfoCreditViewData>;
}

/** Fetches and validates movie credit data using a slug identifier. */
export function useFetchMovieInfoCreditsData(
    {slug, options}: FetchParams,
): UseQueryResult<MovieInfoCreditViewData, HttpResponseError> {
    const fetchData = buildQueryFn<MovieInfoCreditViewData>({
        action: () => getFetchMovieInfoCreditsViewData({slug: slug}),
        schema: MovieInfoCreditViewSchema,
    });

    return useQuery({
        queryKey: MovieClientViewDataQueryKeys.infoCredits({slug}),
        queryFn: fetchData,
        ...useQueryOptionDefaults(options),
    });
}