/**
 * @file useFetchMovieCredit.ts
 *
 * React Query hook for fetching a single `MovieCredit` by ObjectId.
 *
 * Wraps {@link MovieCreditRepository.get} with standardized
 * query handling, error messaging, and default query options.
 */

import MovieCreditRepository from "@/pages/moviecredit/repositories/MovieCreditRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";

/**
 * Parameters for fetching a single movie credit.
 */
type FetchParams = {
    /** Target movie credit ObjectId */
    _id: ObjectId;

    /** Optional request configuration (excluding pagination limits) */
    config?: Omit<RequestOptions, "limit">;

    /** Optional React Query configuration overrides */
    options?: UseQueryOptions<unknown>;
};

/**
 * Fetch a single movie credit by ObjectId.
 *
 * @param params - Fetch parameters
 * @returns React Query result for the movie credit request
 */
export function useFetchMovieCredit(
    {_id, config, options}: FetchParams
): UseQueryResult<unknown, HttpResponseError> {
    const fetchMovieCredit = useQueryFnHandler({
        action: () => MovieCreditRepository.get({_id, config}),
        errorMessage: "Failed to fetch movie credit data. Please try again.",
    });

    return useQuery({
        queryKey: ["movie_credits", "_id", {_id, ...config}],
        queryFn: fetchMovieCredit,
        ...useQueryOptionDefaults(options),
    });
}
