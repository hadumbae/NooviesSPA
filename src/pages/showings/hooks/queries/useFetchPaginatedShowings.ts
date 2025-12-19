import { RequestOptions } from "@/common/type/request/RequestOptions.ts";
import { PaginationValues } from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";
import { UseQueryOptions } from "@/common/type/query/UseQueryOptions.ts";
import { ShowingQueryOptions } from "@/pages/showings/schema/queries/ShowingQueryOption.types.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import ShowingRepository from "@/pages/showings/repositories/ShowingRepository.ts";
import filterNullishAttributes from "@/common/utility/collections/filterNullishAttributes.ts";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

/**
 * @summary
 * Parameters for fetching paginated Showings.
 *
 * @template TData
 * Type of data returned by the query.
 */
type FetchParams<TData = unknown> = PaginationValues & {
    /** Domain-specific query filters. */
    queries?: ShowingQueryOptions;

    /** Request-level options such as population and virtual fields. */
    requestOptions?: RequestOptions;

    /** React Query configuration overrides. */
    queryOptions?: UseQueryOptions<TData>;
};

/**
 * @summary
 * Hook to fetch paginated Showings using React Query.
 *
 * @description
 * Combines pagination values, domain filters, request options, and React Query
 * configuration into a single hook.
 *
 * Features:
 * - Builds a stable query key scoped by `page` and `perPage`
 * - Merges and sanitizes query parameters via {@link filterNullishAttributes}
 * - Uses {@link useQueryFnHandler} for standardized error handling
 * - Applies default React Query options via {@link useQueryOptionDefaults}
 *
 * @template TData
 * Type of data returned by the query.
 *
 * @param params
 * Pagination values, query filters, request options, and query configuration.
 *
 * @returns
 * A `UseQueryResult` containing the paginated Showings data or an {@link HttpResponseError}.
 *
 * @example
 * ```ts
 * const { data, isLoading, error } = useFetchPaginatedShowings({
 *   page: 1,
 *   perPage: 10,
 *   queries: { title: "Hamlet" },
 *   requestOptions: { populate: true },
 * });
 * ```
 */
export default function useFetchPaginatedShowings<TData = unknown>(
    params: FetchParams<TData>
): UseQueryResult<unknown, HttpResponseError> {
    const {
        page,
        perPage,
        queries = {},
        requestOptions = {},
        queryOptions,
    } = params;

    // --- Query Key ---
    const queryKey = ["fetch_paginated_showings_by_query", { page, perPage }];

    // --- Query Function ---
    const queryFn = useQueryFnHandler({
        action: () =>
            ShowingRepository.query({
                queries: filterNullishAttributes({
                    ...queries,
                    ...requestOptions,
                }),
            }),
    });

    // --- Merge Provided Values With Defaults ---
    const optionsWithDefaults = useQueryOptionDefaults(queryOptions);

    return useQuery({
        queryKey,
        queryFn,
        ...optionsWithDefaults,
    });
}
