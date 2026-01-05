import {useQuery, UseQueryResult} from "@tanstack/react-query";

import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

import TheatreRepository from "@/pages/theatres/repositories/TheatreRepository.ts";
import {TheatreQueryOptions} from "@/pages/theatres/schema/queries/TheatreQueryOption.types.ts";

import {FetchByQueryParams} from "@/common/type/query/FetchByQueryParams.ts";
import {PaginationValues} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

/**
 * Parameters accepted by {@link useFetchPaginatedTheatres}.
 *
 * Combines:
 * - {@link PaginationValues} for pagination (`page`, `perPage`)
 * - {@link TheatreQueryOptions} for filtering and sorting
 * - Request configuration and React Query options via {@link FetchByQueryParams}
 *
 * @template TData
 * Expected response data type.
 */
type FetchQueries<TData = unknown> =
    PaginationValues &
    FetchByQueryParams<TheatreQueryOptions, TData>;

/**
 * React Query hook for fetching paginated theatre data.
 *
 * Wraps `useQuery` to:
 * - Fetch paginated theatres via {@link TheatreRepository.paginated}
 * - Apply standardized error handling
 * - Merge default React Query options
 * - Cache results based on pagination and query parameters
 *
 * Intended for theatre index pages, admin listings, and
 * any UI that requires paginated theatre data.
 *
 * @template TData
 * Expected response payload type.
 *
 * @param params - Pagination values, query filters, request config, and query options.
 *
 * @returns A {@link UseQueryResult} containing:
 * - `data` — paginated theatre results
 * - `isLoading` / `isFetching` — loading states
 * - `isError` / `error` — error state
 *
 * @example
 * ```ts
 * const { data, isLoading } = useFetchPaginatedTheatres<PaginatedTheatreDetails>({
 *   page: 1,
 *   perPage: 10,
 *   queries: { city: "Bangkok" },
 *   queryOptions: { staleTime: 30_000 },
 * });
 * ```
 */
export default function useFetchPaginatedTheatres<TData = unknown>(
    params: FetchQueries<TData>
): UseQueryResult<TData, HttpResponseError> {
    const {page, perPage, queries, queryConfig, queryOptions} = params;

    /**
     * Query key scoped by pagination and query parameters.
     */
    const queryKey = [
        "fetch_paginated_theatres_by_query",
        {page, perPage, ...queries, ...queryConfig},
    ];

    /**
     * Query function to fetch paginated theatres.
     */
    const fetchTheatres = useQueryFnHandler({
        errorMessage: "Failed to fetch theatre data. Please try again.",
        action: () =>
            TheatreRepository.paginated({
                page,
                perPage,
                queries,
                config: queryConfig,
            }),
    });

    return useQuery({
        queryKey,
        queryFn: fetchTheatres,
        ...useQueryOptionDefaults(queryOptions),
    });
}
