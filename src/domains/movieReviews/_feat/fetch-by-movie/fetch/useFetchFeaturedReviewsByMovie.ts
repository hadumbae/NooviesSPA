/**
 * @fileoverview React Query hook for fetching featured movie reviews.
 */
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {getFetchFeaturedReviewsByMovie} from "@/domains/movieReviews/_feat/fetch-by-movie/repository";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

/** Parameters for fetching featured movie reviews. */
export type FetchParams = {
    movieID: ObjectId;
    config?: RequestOptions;
    options?: FetchQueryOptions<unknown>;
};

/**
 * Hook that fetches featured reviews for a specific movie.
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