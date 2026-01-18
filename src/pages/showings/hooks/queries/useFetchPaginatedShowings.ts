/**
 * @file useFetchPaginatedShowings.ts
 *
 * React Query hook for fetching paginated `Showing` entities.
 *
 * Handles:
 * - Pagination via `page` and `perPage`
 * - Query filter and request config merging
 * - Nullish query sanitization
 * - Standardized query error handling
 */

import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {PaginationValues} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import {ShowingQueryOptions} from "@/pages/showings/schema/queries/ShowingQueryOption.types.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import ShowingRepository from "@/pages/showings/repositories/ShowingRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

/**
 * Parameters for fetching paginated Showings.
 */
type FetchParams<TData = unknown> = PaginationValues & {
    /** Optional query filters */
    queries?: ShowingQueryOptions;

    /** Optional request configuration */
    config?: RequestOptions;

    /** Optional React Query options */
    options?: UseQueryOptions<TData>;
};

/**
 * Fetches paginated Showings using query filters.
 *
 * @param params - Pagination values, filters, request configuration, and query options.
 *
 * @returns
 * A React Query result containing paginated Showings data or an error state.
 *
 * @example
 * ```ts
 * const { data, isLoading } = useFetchPaginatedShowings({
 *   page: 1,
 *   perPage: 10,
 *   queries: { title: "Hamlet" },
 * });
 * ```
 */
export default function useFetchPaginatedShowings(
    {page, perPage, queries, config, options}: FetchParams
): UseQueryResult<unknown, HttpResponseError> {
    const fetchShowings = useQueryFnHandler({
        action: () => ShowingRepository.paginated({page, perPage, queries, config}),
        errorMessage: "Failed to fetch paginated showings.",
    });

    return useQuery({
        queryKey: ["showings", "lists", "paginated",{...queries, ...config}],
        queryFn: fetchShowings,
        ...useQueryOptionDefaults(options),
    });
}
