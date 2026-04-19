/**
 * @file React Query hook for fetching paginated reviews by movie ID.
 * useFetchReviewsByMovie.ts
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {PaginationValues} from "@/common/features/fetch-pagination-search-params";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {getFetchReviewsByMovie} from "@/domains/movies/repositories/movie-reviews/ReviewsByMovieRepository.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

/**
 * Parameters required to fetch paginated reviews
 * for a specific movie.
 */
type FetchParams = PaginationValues & {
    /**
     * Unique identifier of the movie whose
     * reviews are being requested.
     */
    movieID: ObjectId;

    /**
     * Optional HTTP request configuration.
     *
     * The `limit` field is omitted because
     * pagination is controlled by `perPage`.
     */
    config?: Omit<RequestOptions, "limit">;

    /**
     * Optional React Query configuration overrides.
     */
    options?: FetchQueryOptions<unknown>;
};

/**
 * Fetches paginated reviews for a given movie.
 */
export function useFetchReviewsByMovie(
    {movieID, page, perPage, config, options}: FetchParams
): UseQueryResult<unknown, HttpResponseError> {
    const fetchReviews = useQueryFnHandler({
        action: () => getFetchReviewsByMovie({movieID, page, perPage, config}),
        errorMessage: "Failed to fetch reviews. Please try again.",
    });

    return useQuery({
        queryKey: ["movie_reviews", "lists", "movies", {...config, movieID}],
        queryFn: fetchReviews,
        ...useQueryOptionDefaults(options),
    });
}