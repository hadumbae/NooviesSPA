/**
 * @file useFetchScreens.ts
 *
 * React Query hook for fetching screens by query.
 * Provides a standardized interface for filtered screen retrieval
 * with shared query defaults and consistent error handling.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import ScreenRepository from "@/pages/screens/repositories/ScreenRepository.ts";
import {ScreenQueryOptions} from "@/pages/screens/schema/queries/ScreenQueryOptions.types.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";

/**
 * Parameters for {@link useFetchScreens}.
 */
export type FetchParams = {
    /**
     * Screen query filters and sorting options.
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
 * # useFetchScreens Hook
 *
 * Fetches screens using query-based filtering.
 *
 * Integrates:
 * - **ScreenRepository** for API access
 * - **useQueryFnHandler** for standardized error handling
 * - **useQueryOptionDefaults** for shared React Query defaults
 *
 * @param params
 * Query filters, request configuration, and React Query options.
 *
 * @returns
 * React Query result containing screen data or an {@link HttpResponseError}.
 *
 * @example
 * ```ts
 * const { data, isLoading } = useFetchScreens({
 *   queries: { theatre: theatreId, active: true },
 * });
 * ```
 */
export default function useFetchScreens(
    {queries, config, options}: FetchParams
): UseQueryResult<unknown, HttpResponseError> {
    const fetchScreens = useQueryFnHandler({
        action: () => ScreenRepository.query({queries, config}),
        errorMessage: "Failed to fetch screen data. Please try again.",
    });

    return useQuery({
        queryKey: ["screens", "lists", "query", {...queries, ...config}],
        queryFn: fetchScreens,
        ...useQueryOptionDefaults(options),
    });
}
