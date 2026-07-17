/**
 * @fileoverview Hook for fetching paginated movie reviews and their aggregate details.
 */
import {ObjectId} from "@/common/_schemas";
import {PaginationValues} from "@/common/_feat/fetch-pagination-search-params";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";
import {getFetchReviewDetailsByMovie} from "@/domains/movie-reviews/_feat/fetch-by-movie/repository";
import {useQueryOptionDefaults} from "@/common/_feat/handle-query/useQueryOptionDefaults.ts";
import {FetchByMovieQueryKeys, MovieReviewSummaryData, MovieReviewSummarySchema} from "@/domains/movie-reviews/_feat";
import {buildQueryFn} from "@/common/_feat";

/** Parameters for detailed movie review queries. */
type FetchParams = PaginationValues & {
    movieID: ObjectId;
    config?: Omit<RequestOptions, "limit">;
    options?: FetchQueryOptions<MovieReviewSummaryData>;
};

/** Fetches paginated movie reviews with aggregate details. */
export function useFetchReviewDetailsByMovie(
    {movieID, page, perPage, config, options}: FetchParams
): UseQueryResult<MovieReviewSummaryData, HttpResponseError> {
    const fetchReviews = buildQueryFn<MovieReviewSummaryData>({
        action: () => getFetchReviewDetailsByMovie({movieID, page, perPage, config}),
        schema: MovieReviewSummarySchema,
    });

    return useQuery({
        queryKey: FetchByMovieQueryKeys.details({...config, page, perPage, movieID}),
        queryFn: fetchReviews,
        ...useQueryOptionDefaults(options),
    });
}