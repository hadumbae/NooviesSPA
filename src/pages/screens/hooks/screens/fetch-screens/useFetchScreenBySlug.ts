/**
 * @file useFetchScreenBySlug.ts
 *
 * React Query hook for fetching a single screen by slug.
 * Provides a standardized interface with consistent error handling
 * and shared React Query defaults.
 */

import ScreenRepository from "@/pages/screens/repositories/ScreenRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";

/**
 * Parameters for {@link useFetchScreenBySlug}.
 */
type FetchParams = {
    /**
     * Screen slug identifier.
     */
    slug: string;

    /**
     * Request-level configuration (excluding pagination limit).
     */
    config?: Omit<RequestOptions, "limit">;

    /**
     * React Query configuration overrides.
     */
    options?: UseQueryOptions<unknown>;
};

/**
 * # useFetchScreenBySlug Hook
 *
 * Fetches a single screen using its slug identifier.
 *
 * Integrates:
 * - **ScreenRepository** for API access
 * - **useQueryFnHandler** for consistent error handling
 * - **useQueryOptionDefaults** for shared React Query defaults
 *
 * @param params
 * Screen slug, request configuration, and React Query options.
 *
 * @returns
 * React Query result containing screen data or an {@link HttpResponseError}.
 *
 * @example
 * ```ts
 * const { data, isLoading } = useFetchScreenBySlug({
 *   slug: "imax-main-hall",
 * });
 * ```
 */
export default function useFetchScreenBySlug(
    {slug, config, options}: FetchParams
): UseQueryResult<unknown, HttpResponseError> {
    const fetchScreen = useQueryFnHandler({
        action: () => ScreenRepository.getBySlug({slug, config}),
        errorMessage: "Failed to fetch screen data. Please try again.",
    });

    return useQuery({
        queryKey: ["fetch_screen_by_slug", {slug, ...config}],
        queryFn: fetchScreen,
        ...useQueryOptionDefaults(options),
    });
}
