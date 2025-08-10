import {EntityPaginatedQuery, RequestOptions} from "@/common/type/repositories/EntityRequestParamTypes.ts";
import {MovieCreditFilters} from "@/pages/moviecredit/schemas/filters/MovieCreditFilterSchema.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import MovieCreditRepository from "@/pages/moviecredit/repositories/MovieCreditRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

/**
 * Combined query parameters for fetching movie credits.
 *
 * Includes pagination, request options, and filter parameters specific to movie credits.
 */
type FetchQueries = RequestOptions & EntityPaginatedQuery & MovieCreditFilters;

/**
 * React hook to fetch paginated and filtered movie credit data.
 *
 * This hook integrates with `react-query` to manage asynchronous fetching
 * and caching of movie credit entries. It uses a query key based on the input
 * parameters to ensure proper caching and refetching behavior.
 *
 * The fetcher uses `MovieCreditRepository.query` under the hood and wraps it with
 * `useQueryFnHandler` to handle errors gracefully.
 *
 * @param queries - Combined parameters for pagination, filtering, and request control.
 * @returns A `useQuery` result object including status, data, and error handling.
 */
export default function useFetchMovieCredits(queries: FetchQueries): UseQueryResult<unknown, HttpResponseError> {
    const queryKey = ["fetch_movie_credits_by_query", queries];

    const fetchMovieCredits = useQueryFnHandler({
        action: () => MovieCreditRepository.query({queries}),
        errorMessage: "Failed to fetch movie credit data. Please try again."
    });

    return useQuery({
        queryKey,
        queryFn: fetchMovieCredits,
        staleTime: 1000 * 60,
        placeholderData: (previousData) => previousData,
    });
}