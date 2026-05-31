/**
 * @fileoverview React Query hook for fetching the current user's MovieReviews.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {getFetchMovieReviewsByCurrentUser} from "@/domains/movieReviews/_feat/my-reviews/repository/repository.ts";
import {PaginationValues} from "@/common/_feat/fetch-pagination-search-params";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {MyReviewsQueryKeys} from "@/domains/movieReviews/_feat";
import {QueryConfig} from "@/common/types";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";

/** Parameters for useFetchMyMovieReviews. */
type FetchParams<TData = unknown> = PaginationValues & QueryConfig<TData>;

/**
 * Fetches a paginated collection of MovieReviews belonging to the currently authenticated user.
 */
export function useFetchMyMovieReviews<TData = unknown>(
    {page, perPage, schema, config, options}: FetchParams<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchReviews = buildQueryFn<TData>({
        action: () => getFetchMovieReviewsByCurrentUser({page, perPage, config}),
        schema,
    });

    return useQuery({
        queryKey: MyReviewsQueryKeys.current({page, perPage, ...config}),
        queryFn: fetchReviews,
        ...useQueryOptionDefaults(options),
    });
}