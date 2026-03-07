/**
 * @file React Query hook for fetching featured movie reviews.
 * @filename useFetchFeaturedReviewsByMovie.ts
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {getFetchFeaturedReviewsByMovie} from "@/pages/movies/repositories/movie-reviews/ReviewsByMovieRepository.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

/**
 * Parameters for fetching featured movie reviews.
 */
type FetchParams = {
    /** Target movie identifier. */
    movieID: ObjectId;

    /** Optional request options. */
    config?: RequestOptions;

    /** Optional React Query configuration. */
    options?: UseQueryOptions<unknown>;
};

/**
 * Fetches featured reviews for a movie.
 */
export function useFetchFeaturedReviewsByMovie(
    {movieID, options, config}: FetchParams
): UseQueryResult<unknown, HttpResponseError> {
    const fetchReviews = useQueryFnHandler({
        action: () => getFetchFeaturedReviewsByMovie({movieID, config}),
        errorMessage: "Failed to fetch reviews. Please try again.",
    });

    return useQuery({
        queryKey: ["movie_reviews", "lists", "movie", "featured", {...config, movieID}],
        queryFn: fetchReviews,
        ...useQueryOptionDefaults(options),
    });
}