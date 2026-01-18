/**
 * @file useFetchShowings.ts
 *
 * React Query hook for fetching `Showing` entities via query filters.
 *
 * Handles:
 * - Query and request config merging
 * - Default React Query option application
 * - Standardized repository error handling
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {ShowingQueryOptions} from "@/pages/showings/schema/queries/ShowingQueryOption.types.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import ShowingRepository from "@/pages/showings/repositories/ShowingRepository.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

/**
 * Parameters for querying Showings.
 */
type FetchParams = {
    /** Optional query filters */
    queries?: ShowingQueryOptions;

    /** Optional request configuration */
    config?: RequestOptions;

    /** Optional React Query options */
    options?: UseQueryOptions<unknown>;
};

/**
 * Fetches Showings using query-based filters.
 *
 * @param params - Query filters, request configuration, and query options.
 *
 * @returns
 * A React Query result containing the Showings data or error state.
 *
 * @example
 * ```tsx
 * const { data, isLoading } = useFetchShowings({
 *   queries: { theatre: theatreId },
 * });
 * ```
 */
export default function useFetchShowings(
    {queries, config, options}: FetchParams = {}
): UseQueryResult<unknown, HttpResponseError> {
    const fetchShowingsByQuery = useQueryFnHandler({
        action: () => ShowingRepository.query({queries, config}),
        errorMessage: "Failed to fetch showings.",
    });

    return useQuery({
        queryKey: ["showings", "lists", "query", {...queries, ...config}],
        queryFn: fetchShowingsByQuery,
        ...useQueryOptionDefaults(options),
    });
}
