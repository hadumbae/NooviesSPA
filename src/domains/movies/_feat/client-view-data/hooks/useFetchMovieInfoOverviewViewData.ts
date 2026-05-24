/**
 * @fileoverview Hook for fetching and validating movie overview view data.
 */

import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import {MovieInfoOverviewViewData, MovieInfoOverviewViewSchema} from "@/domains/movies/_feat/client-view-data";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {getFetchMovieInfoOverviewViewData} from "@/domains/movies/_feat/client-view-data/repositories/repository.ts";
import {MovieClientViewDataQueryKeys} from "@/domains/movies/_feat/client-view-data/hooks/queryKeys.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

/** Configuration for fetching movie info overview data. */
type FetchConfig = {
    slug: SlugString;
    options?: FetchQueryOptions<MovieInfoOverviewViewData>;
    queries?: {
        reviewPage: number;
        reviewPerPage: number;
    };
}

/** Fetches and validates the composite data for the movie information overview view. */
export function useFetchMovieInfoOverviewViewData(
    {slug, options, queries = {reviewPage: 1, reviewPerPage: 3}}: FetchConfig
): UseQueryResult<MovieInfoOverviewViewData, HttpResponseError> {
    const fetchViewData = buildQueryFn({
        action: () => getFetchMovieInfoOverviewViewData({slug, queries}),
        schema: MovieInfoOverviewViewSchema,
    });

    return useQuery({
        queryKey: MovieClientViewDataQueryKeys.infoOverview({slug, ...queries}),
        queryFn: fetchViewData,
        ...useQueryOptionDefaults(options),
    });
}