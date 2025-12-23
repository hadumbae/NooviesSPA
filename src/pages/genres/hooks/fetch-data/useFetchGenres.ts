import {GenreQueryOptions} from "@/pages/genres/schema/filters/GenreQueryOptions.types.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import GenreRepository from "@/pages/genres/repositories/GenreRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {RequestOptions, RequestPaginationOptions} from "@/common/type/request/RequestOptions.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import filterNullishAttributes from "@/common/utility/collections/filterNullishAttributes.ts";

/**
 * Parameters accepted by {@link useFetchGenres}.
 *
 * @template TData - Optional override for the query data shape
 */
type FetchQueries<TData = unknown> = {
    /**
     * Genre-specific query parameters (filters, sorting).
     */
    queries?: GenreQueryOptions & RequestPaginationOptions;

    /**
     * Low-level request options (populate, virtuals, etc.).
     */
    requestOptions?: RequestOptions;

    /**
     * React Query configuration overrides.
     */
    queryOptions?: UseQueryOptions<TData>;
};

/**
 * Fetches genre data using query-based filters.
 *
 * @remarks
 * - Delegates API access to {@link GenreRepository.query}
 * - Uses React Query for caching, background refetching, and deduplication
 * - Filters out `null` and `undefined` query parameters before execution
 *
 * @template TData - Optional override for the resolved query data
 * @param params - Query, request, and React Query options
 * @returns React Query result for the genre query
 *
 * @example
 * ```ts
 * const {data, isLoading} = useFetchGenres({
 *   queries: { name: "Jazz", page: 1 },
 * });
 * ```
 */
export default function useFetchGenres<TData = unknown>(
    params?: FetchQueries<TData>
): UseQueryResult<unknown, HttpResponseError> {
    const {queries = {}, requestOptions = {}, queryOptions = {}} = params ?? {};

    // --- OPTIONS ---
    const optionsWithDefaults = useQueryOptionDefaults(queryOptions);
    const filteredQueries = filterNullishAttributes({
        ...queries,
        ...requestOptions,
    });

    // --- QUERY FN ---
    const fetchGenres = useQueryFnHandler({
        errorMessage: "Failed to fetch genres. Please try again.",
        action: () => GenreRepository.query({queries: filteredQueries}),
    });

    // --- QUERY ---
    return useQuery({
        queryKey: ["fetch_genres_by_query"],
        queryFn: fetchGenres,
        ...optionsWithDefaults,
    });
}
