import {GenreQueryOptions} from "@/pages/genres/schema/filters/GenreQueryOptions.types.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import GenreRepository from "@/pages/genres/repositories/GenreRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {RequestOptions, RequestPaginationOptions} from "@/common/type/request/RequestOptions.ts";

/**
 * **FetchQueries**
 *
 * Combined type representing all query parameters that can be used
 * when fetching genres.
 *
 * @example
 * ```ts
 * const queries: FetchQueries = {
 *   page: 1,
 *   limit: 10,
 *   name: "Rock",
 *   sortByName: 1
 * };
 * ```
 */
type FetchQueries = RequestOptions & RequestPaginationOptions & GenreQueryOptions;

/**
 * **useFetchGenres**
 *
 * React hook that fetches genres from the API based on provided query parameters.
 *
 * - Internally uses:
 *   - `GenreRepository.query()` to perform the API request.
 *   - `@tanstack/react-query` for caching, deduplication, and re-fetching.
 * - Automatically handles errors and provides placeholder data to avoid UI flicker.
 *
 * @param queries - Optional query parameters (pagination, filters, sorting, request options)
 * @returns A React Query result object containing:
 *   - `data`: The fetched genre data.
 *   - `error`: Any error encountered.
 *   - `isLoading`: Loading state.
 *   - `refetch`: Function to manually refetch.
 *
 * @example
 * ```ts
 * const { data, isLoading, error } = useFetchGenres({
 *   page: 1,
 *   limit: 10,
 *   name: "Jazz",
 *   sortByName: -1
 * });
 *
 * if (isLoading) return <p>Loading...</p>;
 * if (error) return <p>Error loading genres</p>;
 *
 * return (
 *   <ul>
 *     {data?.items.map((genre) => (
 *       <li key={genre.id}>{genre.name}</li>
 *     ))}
 *   </ul>
 * );
 * ```
 */
export default function useFetchGenres(queries: FetchQueries = {}): UseQueryResult<unknown, HttpResponseError> {
    const queryKey = ["fetch_genres_by_query", queries ] as const;

    const fetchGenres = useQueryFnHandler({
        action: () => GenreRepository.query({queries}),
        errorMessage: "Failed to fetch genres. Please try again.",
    });

    return useQuery({
        queryKey,
        queryFn: fetchGenres,
        staleTime: 1000 * 60,
        placeholderData: (previousData) => previousData,
    });
}