/**
 * @fileoverview React Query hook for fetching paginated reviews by movie ID.
 */

import {ObjectId} from "@/common/_schemas";
import {PaginationValues} from "@/common/_feat/fetch-pagination-search-params";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";
import {getFetchReviewsByMovie} from "@/domains/movie-reviews/_feat/fetch-by-movie/repository";
import {useQueryOptionDefaults} from "@/common/_feat/handle-query/useQueryOptionDefaults.ts";
import {FetchByMovieQueryKeys} from "@/domains/movie-reviews/_feat";
import {buildQueryFn, generatePaginationSchema} from "@/common/_feat";
import {PopulatedMovieReview, PopulatedMovieReviewSchema} from "@/domains/movie-reviews";
import {PaginatedItems} from "@/common/_types";

/** Parameters required to fetch paginated reviews for a specific movie. */
type FetchParams = PaginationValues & {
    movieID: ObjectId;
    config?: Omit<RequestOptions, "limit">;
    options?: FetchQueryOptions<PaginatedItems<PopulatedMovieReview>>;
};

/** Fetches paginated reviews for a given movie. */
export function useFetchReviewsByMovie(
    {movieID, page, perPage, config, options}: FetchParams
): UseQueryResult<PaginatedItems<PopulatedMovieReview>, HttpResponseError> {
    const fetchReviews = buildQueryFn<PaginatedItems<PopulatedMovieReview>>({
        action: () => getFetchReviewsByMovie({movieID, page, perPage, config}),
        schema: generatePaginationSchema(PopulatedMovieReviewSchema),
    });

    return useQuery({
        queryKey: FetchByMovieQueryKeys.movie({...config, movieID}),
        queryFn: fetchReviews,
        ...useQueryOptionDefaults(options),
    });
}