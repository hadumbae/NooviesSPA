/**
 * @fileoverview Hook for fetching and validating paginated movie review data for the client view.
 */

import {SlugString} from "@/common/_schemas";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {
    getReviewsForMovieInfoView,
    MovieClientViewDataQueryKeys,
    MovieInfoReviewsViewData,
    MovieInfoReviewsViewSchema
} from "@/domains/movies";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

/** Configuration for the movie reviews fetch hook. */
type FetchConfig = {
    slug: SlugString;
    queries?: {
        reviewPage?: number;
        reviewPerPage?: number;
    };
    options?: FetchQueryOptions<MovieInfoReviewsViewData>;
}

/** Fetches and validates paginated review data for a specific movie. */
export function useFetchMovieInfoReviewsData(
    {slug, queries, options}: FetchConfig
): UseQueryResult<MovieInfoReviewsViewData, HttpResponseError> {
    const fetchReviewData = buildQueryFn<MovieInfoReviewsViewData>({
        action: () => getReviewsForMovieInfoView({slug, queries}),
        schema: MovieInfoReviewsViewSchema,
    });

    return useQuery({
        queryKey: MovieClientViewDataQueryKeys.infoReviews({slug, ...queries}),
        queryFn: fetchReviewData,
        ...useQueryOptionDefaults(options),
    });
}