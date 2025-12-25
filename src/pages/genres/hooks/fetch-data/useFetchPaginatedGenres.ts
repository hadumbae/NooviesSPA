import {GenreQueryOptions} from "@/pages/genres/schema/filters/GenreQueryOptions.types.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import {PaginationValues} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import filterNullishAttributes from "@/common/utility/collections/filterNullishAttributes.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import GenreRepository from "@/pages/genres/repositories/GenreRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

/**
 * Combined parameters for fetching paginated genres.
 *
 * @template TData - Expected query result type
 */
type FetchQueries<TData = unknown> = PaginationValues & {
    queries?: GenreQueryOptions;
    requestOptions?: RequestOptions;
    queryOptions?: UseQueryOptions<TData>;
};

/**
 * Fetches paginated genres using React Query.
 *
 * Applies pagination, filters, and request options while automatically:
 * - Removing nullish query parameters
 * - Applying default React Query options
 * - Handling API errors consistently
 *
 * @param params - Pagination values and optional query configuration
 * @returns React Query result for the paginated genre request
 *
 * @example
 * ```ts
 * const { data, isLoading } = useFetchPaginatedGenres({
 *   page: 1,
 *   perPage: 20,
 *   queries: { name: "Rock" }
 * });
 * ```
 */
export default function useFetchPaginatedGenres<TData = unknown>(
    params: FetchQueries<TData>
): UseQueryResult<unknown, HttpResponseError> {
    const {
        page,
        perPage,
        queries = {},
        requestOptions = {},
        queryOptions = {},
    } = params ?? {};

    // --- OPTIONS ---
    const optionsWithDefaults = useQueryOptionDefaults(queryOptions);
    const filteredQueries = filterNullishAttributes({
        paginated: true,
        page,
        perPage,
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
        queryKey: ["fetch_paginated_genres_by_query", filteredQueries],
        queryFn: fetchGenres,
        ...optionsWithDefaults,
    });
}
