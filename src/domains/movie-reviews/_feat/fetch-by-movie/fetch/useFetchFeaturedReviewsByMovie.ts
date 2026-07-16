/**
 * @fileoverview React Query hook for fetching featured movie reviews.
 */
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {ObjectId} from "@/common/_schemas";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {getFetchFeaturedReviewsByMovie} from "@/domains/movie-reviews/_feat/fetch-by-movie/repository";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {
    FeaturedReviewsByMovie,
    FeaturedReviewsByMovieSchema,
    FetchByMovieQueryKeys
} from "@/domains/movie-reviews/_feat";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";

/** Parameters for fetching featured movie reviews. */
export type FetchParams = {
    movieID: ObjectId;
    config?: Pick<RequestOptions, "limit">;
    options?: FetchQueryOptions<FeaturedReviewsByMovie>;
};

/**
 * Hook that fetches featured reviews for a specific movie.
 */
export function useFetchFeaturedReviewsByMovie(
    {movieID, options, config}: FetchParams
): UseQueryResult<FeaturedReviewsByMovie, HttpResponseError> {
    const fetchReviews = buildQueryFn<FeaturedReviewsByMovie>({
        action: () => getFetchFeaturedReviewsByMovie({movieID, config: {populate: true, virtuals: true, ...config}}),
        schema: FeaturedReviewsByMovieSchema,
    });

    return useQuery({
        queryKey: FetchByMovieQueryKeys.featured({...config, movieID}),
        queryFn: fetchReviews,
        ...useQueryOptionDefaults(options),
    });
}