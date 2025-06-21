import {EntityPaginatedQuery, RequestOptions} from "@/common/type/repositories/EntityRequestParamTypes.ts";
import {MovieFilterQuery} from "@/pages/movies/schema/queries/MovieFilterQuerySchema.ts";
import MovieRepository from "@/pages/movies/repositories/MovieRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";

/**
 * Combined query parameters for fetching movie data.
 *
 * This includes pagination info, general request options, and movie-specific filter criteria.
 */
type QueryParams = RequestOptions & EntityPaginatedQuery & MovieFilterQuery;

/**
 * React hook to fetch paginated, filtered movie data.
 *
 * This hook uses `react-query` to manage caching, loading states, and background updates.
 * It internally calls `MovieRepository.query` and wraps it with `useQueryFnHandler` to
 * standardize error handling.
 *
 * A unique query key is generated from the `queries` parameter to enable effective caching.
 *
 * @param queries - The combined query parameters for request options, pagination, and filters.
 * @returns A `UseQueryResult` containing status, data, and error metadata for the query.
 */
export default function useFetchMovies(queries: QueryParams): UseQueryResult<unknown> {
    const queryKey = ["fetch_movies_by_query", queries] as const;

    const fetchMovies = useQueryFnHandler({
        action: () => MovieRepository.query({queries}),
        errorMessage: "Failed to fetch movie data. Please try again."
    });

    return useQuery({
        queryKey,
        queryFn: fetchMovies,
        staleTime: 1000 * 60,
        placeholderData: (previousData) => previousData,
    });
}