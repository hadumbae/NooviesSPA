/**
 * @fileoverview React Query hooks for fetching MovieReview collections.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {ListQueryConfig} from "@/common/types";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {MovieReviewCRUDQueryKeys} from "@/domains/movie-reviews/_feat";
import {find} from "@/domains/movie-reviews/_feat/crud/repository/repository.ts";

/**
 * Fetches a collection of movie reviews and validates them against a schema.
 */
export function useFetchMovieReviews<TData = unknown>(
    {schema, queries, config, options}: ListQueryConfig<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchReviews = buildQueryFn<TData>({
        action: () => find({queries, config}),
        schema,
    });

    return useQuery({
        queryKey: MovieReviewCRUDQueryKeys.find({...queries, ...config}),
        queryFn: fetchReviews,
        ...useQueryOptionDefaults(options),
    });
}
