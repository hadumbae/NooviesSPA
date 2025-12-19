import { useQuery, UseQueryResult } from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import { ShowingQueryOptions } from "@/pages/showings/schema/queries/ShowingQueryOption.types.ts";
import { UseQueryOptions } from "@/common/type/query/UseQueryOptions.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import ShowingRepository from "@/pages/showings/repositories/ShowingRepository.ts";
import { RequestOptions } from "@/common/type/request/RequestOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

/**
 * @summary
 * Parameters for fetching Showings.
 *
 * @template TData
 * Type of data returned by the query.
 */
type FetchParams<TData = unknown> = {
    /**
     * Domain-specific query filters.
     */
    queries?: ShowingQueryOptions;

    /**
     * Request-level options such as `populate` or `virtuals`.
     */
    requestOptions?: RequestOptions;

    /**
     * React Query configuration overrides.
     */
    queryOptions?: UseQueryOptions<TData>;
};

/**
 * @summary
 * Hook to fetch Showings using React Query.
 *
 * @description
 * Executes a query against the Showing repository, combining domain filters,
 * request-level options, and React Query configuration.
 *
 * Features:
 * - Provides a stable query key
 * - Handles HTTP errors via {@link HttpResponseError}
 * - Applies default React Query options, which can be overridden
 *
 * @template TData
 * Type of data returned by the query.
 *
 * @param params
 * Query filters, request options, and React Query overrides.
 *
 * @returns
 * A React Query `UseQueryResult` containing Showings data or an `HttpResponseError`.
 *
 * @example
 * ```ts
 * const { data, isLoading, error } = useFetchShowings({
 *   queries: { title: "Hamlet" },
 *   requestOptions: { populate: true },
 * });
 * ```
 */
export default function useFetchShowings<TData = unknown>(
    params: FetchParams<TData>
): UseQueryResult<unknown, HttpResponseError> {
    const {
        queries = {},
        requestOptions = {},
        queryOptions = {},
    } = params ?? {};

    // --- Query Key ---
    const queryKey = ["fetch_showings_by_query"];

    // --- Query Function ---
    const fetchShowingsByQuery = useQueryFnHandler({
        errorMessage: "Failed to fetch data. Please try again.",
        action: () =>
            ShowingRepository.query({
                queries: {
                    ...queries,
                    ...requestOptions,
                },
            }),
    });

    // --- Merge Provided Options With Defaults ---
    const optionsWithDefaults = useQueryOptionDefaults(queryOptions);

    return useQuery({
        queryKey,
        queryFn: fetchShowingsByQuery,
        ...optionsWithDefaults,
    });
}
