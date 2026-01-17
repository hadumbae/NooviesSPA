/**
 * @file useFetchPaginatedScreens.ts
 *
 * React Query hook for fetching paginated screens.
 * Supports pagination, query-based filtering, request configuration,
 * and shared React Query defaults with standardized error handling.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import ScreenRepository from "@/pages/screens/repositories/ScreenRepository.ts";
import {ScreenQueryOptions} from "@/pages/screens/schema/queries/ScreenQueryOptions.types.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {PaginationValues} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";

/**
 * Parameters for {@link useFetchPaginatedScreens}.
 */
export type FetchParams = PaginationValues & {
    /**
     * Screen query filters.
     */
    queries?: ScreenQueryOptions;

    /**
     * Request-level configuration.
     */
    config?: RequestOptions;

    /**
     * React Query configuration overrides.
     */
    options?: UseQueryOptions<unknown>;
};

/**
 * # useFetchPaginatedScreens Hook
 *
 * Fetches paginated screen data using React Query.
 *
 * Integrates:
 * - **ScreenRepository** for API access
 * - **useQueryFnHandler** for consistent error handling
 * - **useQueryOptionDefaults** for shared query defaults
 *
 * @param params
 * Pagination values, query filters, request configuration,
 * and React Query options.
 *
 * @returns
 * React Query result containing screen data or an {@link HttpResponseError}.
 *
 * @example
 * ```ts
 * const { data, isLoading } = useFetchPaginatedScreens({
 *   page: 1,
 *   perPage: 10,
 *   queries: { theatre: theatreId },
 * });
 * ```
 */
export default function useFetchPaginatedScreens(
    {page, perPage, queries, config, options}: FetchParams
): UseQueryResult<unknown, HttpResponseError> {
    const fetchScreens = useQueryFnHandler({
        action: () => ScreenRepository.paginated({page, perPage, queries, config}),
        errorMessage: "Failed to fetch screen data. Please try again.",
    });

    return useQuery({
        queryKey: ["screens", "lists", "paginated", {page, perPage, ...queries, ...config}],
        queryFn: fetchScreens,
        ...useQueryOptionDefaults(options),
    });
}
