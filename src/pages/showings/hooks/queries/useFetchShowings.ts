/**
 * @file useFetchShowings.ts
 *
 * React Query hook for fetching showings using query-based filters.
 *
 * Responsibilities:
 * - Merges query filters and request config
 * - Removes nullish query attributes
 * - Applies default React Query options
 * - Wraps repository calls with standardized error handling
 */

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import { ShowingQueryOptions } from "@/pages/showings/schema/queries/ShowingQueryOption.types.ts";
import { UseQueryOptions } from "@/common/type/query/UseQueryOptions.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import ShowingRepository from "@/pages/showings/repositories/ShowingRepository.ts";
import { RequestOptions } from "@/common/type/request/RequestOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import filterNullishAttributes from "@/common/utility/collections/filterNullishAttributes.ts";

/**
 * Parameters for `useFetchShowings`.
 *
 * @template TData - Expected response data shape
 */
type FetchParams<TData = unknown> = {
    /** Query-level filters (e.g. movie, date, cinema) */
    queries?: ShowingQueryOptions;

    /** Request configuration (virtuals, populate, etc.) */
    queryConfig?: RequestOptions;

    /** React Query configuration overrides */
    queryOptions?: UseQueryOptions<TData>;
};

/**
 * Fetch showings using query-based filters.
 *
 * @template TData - Expected response data shape
 * @param params - Query filters, request config, and query options
 * @returns React Query result containing showings data or error state
 */
export default function useFetchShowings<TData = unknown>(
    params: FetchParams<TData>
): UseQueryResult<unknown, HttpResponseError> {
    const {queries, queryConfig, queryOptions} = params ?? {};

    // --- CONFIG ---
    const optionsWithDefaults = useQueryOptionDefaults(queryOptions);
    const filteredQueries = filterNullishAttributes({...queries,...queryConfig});

    // --- FUNCTION ---
    const fetchShowingsByQuery = useQueryFnHandler({
        errorMessage: "Failed to fetch data. Please try again.",
        action: () => ShowingRepository.query({ queries: filteredQueries }),
    });

    // --- USE QUERY ---
    return useQuery({
        queryKey: ["fetch_showings_by_query", filteredQueries],
        queryFn: fetchShowingsByQuery,
        ...optionsWithDefaults,
    });
}
