/**
 * @file Movie review details query hook.
 * useFetchReviewDetailsByMovie.ts
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {PaginationValues} from "@/common/features/fetch-pagination-search-params";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {getFetchReviewDetailsByMovie} from "@/domains/movies/repositories/movie-reviews/ReviewsByMovieRepository.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

/**
 * Parameters for detailed movie review queries.
 */
type FetchParams = PaginationValues & {
    movieID: ObjectId;
    config?: Omit<RequestOptions, "limit">;
    options?: UseQueryOptions<unknown>;
};

/**
 * Fetches paginated movie reviews with aggregate details.
 */
export function useFetchReviewDetailsByMovie(
    {movieID, page, perPage, config, options}: FetchParams
): UseQueryResult<unknown, HttpResponseError> {
    const fetchReviews = useQueryFnHandler({
        action: () => getFetchReviewDetailsByMovie({movieID, page, perPage, config}),
        errorMessage: "Failed to fetch reviews. Please try again.",
    });

    return useQuery({
        queryKey: ["movie_reviews", "lists", "movie", "details", {...config, page, perPage, movieID}],
        queryFn: fetchReviews,
        ...useQueryOptionDefaults(options),
    });
}