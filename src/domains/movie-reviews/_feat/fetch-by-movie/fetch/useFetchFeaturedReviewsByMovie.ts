/**
 * @fileoverview React Query hook for fetching featured movie reviews.
 */
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {getFetchFeaturedReviewsByMovie} from "@/domains/movie-reviews/_feat/fetch-by-movie/repository";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {FetchByMovieQueryKeys} from "@/domains/movie-reviews/_feat";
import {ZodType, ZodTypeDef} from "zod";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";

/** Parameters for fetching featured movie reviews. */
export type FetchParams<TData = unknown> = {
    schema: ZodType<TData, ZodTypeDef, unknown>;
    movieID: ObjectId;
    config?: RequestOptions;
    options?: FetchQueryOptions<unknown>;
};

/**
 * Hook that fetches featured reviews for a specific movie.
 */
export function useFetchFeaturedReviewsByMovie<TData = unknown>(
    {schema, movieID, options, config}: FetchParams<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchReviews = buildQueryFn({
        action: () => getFetchFeaturedReviewsByMovie({movieID, config}),
        schema,
    });

    return useQuery({
        queryKey: FetchByMovieQueryKeys.featured({...config, movieID}),
        queryFn: fetchReviews,
        ...useQueryOptionDefaults(options),
    });
}