/**
 * @file useFetchScreen.ts
 *
 * React Query hook for fetching a single screen by ID.
 * Provides a standardized, typed interface with consistent
 * error handling and shared React Query defaults.
 */

import ScreenRepository from "@/pages/screens/repositories/ScreenRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";

/**
 * Parameters for {@link useFetchScreen}.
 */
type FetchParams = {
    /**
     * Screen identifier.
     */
    _id: ObjectId;

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
 * # useFetchScreen Hook
 *
 * Fetches a single screen by its unique identifier.
 *
 * Integrates:
 * - **ScreenRepository** for API access
 * - **useQueryFnHandler** for consistent error handling
 * - **useQueryOptionDefaults** for shared React Query defaults
 *
 * @param params
 * Screen ID, request configuration, and React Query options.
 *
 * @returns
 * React Query result containing screen data or an {@link HttpResponseError}.
 *
 * @example
 * ```ts
 * const { data, isLoading } = useFetchScreen({
 *   _id: screenId,
 * });
 * ```
 */
export default function useFetchScreen(
    {_id, config, options}: FetchParams
): UseQueryResult<unknown, HttpResponseError> {
    const fetchScreen = useQueryFnHandler({
        action: () => ScreenRepository.get({_id, config}),
        errorMessage: "Failed to fetch screen data. Please try again.",
    });

    return useQuery({
        queryKey: ["screens", "_id", {_id, ...config}],
        queryFn: fetchScreen,
        ...useQueryOptionDefaults(options),
    });
}
