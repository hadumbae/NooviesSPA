/**
 * @file useFetchPaginatedTheatres.ts
 *
 * React Query hook for fetching paginated theatres.
 * Supports pagination, query-based filtering, request configuration,
 * and shared React Query defaults with consistent error handling.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import TheatreRepository from "@/pages/theatres/repositories/TheatreRepository.ts";
import {TheatreQueryOptions} from "@/pages/theatres/schema/queries/TheatreQueryOption.types.ts";
import {PaginationValues} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";

/**
 * Parameters for {@link useFetchPaginatedTheatres}.
 *
 * @template TData
 * Optional transformed response type.
 */
type FetchQueries<TData = unknown> = PaginationValues & {
    /**
     * Theatre query filters.
     */
    queries?: TheatreQueryOptions;

    /**
     * Request-level configuration (excluding pagination limit).
     */
    config?: Omit<RequestOptions, "limit">;

    /**
     * React Query configuration overrides.
     */
    options?: UseQueryOptions<TData>;
};

/**
 * # useFetchPaginatedTheatres Hook
 *
 * Fetches paginated theatre data using React Query.
 *
 * Integrates:
 * - **TheatreRepository** for API access
 * - **useQueryFnHandler** for standardized error handling
 * - **useQueryOptionDefaults** for shared query defaults
 *
 * @template TData
 * Optional transformed response type.
 *
 * @param params
 * Pagination values, query filters, request configuration,
 * and React Query options.
 *
 * @returns
 * React Query result containing theatre data or an {@link HttpResponseError}.
 *
 * @example
 * ```ts
 * const { data, isLoading } = useFetchPaginatedTheatres({
 *   page: 1,
 *   perPage: 20,
 *   queries: { city: "Berlin" },
 * });
 * ```
 */
export default function useFetchPaginatedTheatres<TData = unknown>(
    {page, perPage, queries, config, options}: FetchQueries<TData>
): UseQueryResult<TData, HttpResponseError> {
    const queryKey = [
        "theatres", "lists", "paginated",
        {page, perPage, ...queries, ...config},
    ];

    const fetchTheatres = useQueryFnHandler({
        errorMessage: "Failed to fetch theatre data. Please try again.",
        action: () => TheatreRepository.paginated({page, perPage, queries, config}),
    });

    return useQuery({
        queryKey,
        queryFn: fetchTheatres,
        ...useQueryOptionDefaults(options),
    });
}
