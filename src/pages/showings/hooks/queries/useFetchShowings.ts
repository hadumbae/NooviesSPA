import { useQuery, UseQueryResult } from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import { ShowingQueryOptions } from "@/pages/showings/schema/queries/ShowingQueryOption.types.ts";
import { UseQueryOptions } from "@/common/type/query/UseQueryOptions.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import ShowingRepository from "@/pages/showings/repositories/ShowingRepository.ts";
import {RequestOptions, RequestPaginationOptions} from "@/common/type/request/RequestOptions.ts";

/**
 * Parameters for `UseFetchShowings` hook.
 *
 * @template TData - Expected type of the returned data (default: `unknown`)
 */
type FetchParams<TData = unknown> = {
    /** Optional query filters, pagination, and sort options */
    queries?: RequestOptions & RequestPaginationOptions & ShowingQueryOptions;
    /** Optional React Query options such as `enabled`, `staleTime`, `initialData`, and `placeholderData` */
    options?: UseQueryOptions<TData>;
};

/**
 * React Query hook to fetch **multiple movie showings** based on query filters.
 *
 * Supports pagination, filtering, and sorting via `ShowingQueryOptions`.
 * Allows React Query options such as `enabled`, `staleTime`, `placeholderData`, and `initialData`.
 *
 * @template TData - The expected type of the query result data
 *
 * @param params - Optional parameters for the query
 * @param params.queries - Filters, sort, and pagination options
 * @param params.options - React Query options
 *
 * @returns A `UseQueryResult` containing:
 * - `data`: array or paginated list of showings
 * - `isLoading`: boolean indicating if the request is in progress
 * - `error`: `HttpResponseError` if the request failed
 *
 * @example
 * ```ts
 * const { data, isLoading, error } = UseFetchShowings({
 *   queries: { movie: "movieId123", startTime: "2025-10-14" },
 *   options: { staleTime: 60000 }
 * });
 *
 * if (isLoading) return <Spinner />;
 * if (error) return <ErrorMessage message={error.message} />;
 *
 * return <ShowingList showings={data} />;
 * ```
 */
export default function useFetchShowings<TData = unknown>(
    params: FetchParams<TData> = {}
): UseQueryResult<unknown, HttpResponseError> {
    const { queries = {}, options = {} } = params;

    const {
        enabled = true,
        staleTime = 1000 * 60,
        placeholderData = (data: TData | undefined) => data,
        initialData,
    } = options;

    const queryKey = ["fetch_showings_by_query"];

    const fetchShowingsByQuery = useQueryFnHandler({
        action: () => ShowingRepository.query({ queries }),
        errorMessage: "Failed to fetch data. Please try again.",
    });

    return useQuery({
        queryKey,
        queryFn: fetchShowingsByQuery,
        enabled,
        staleTime,
        placeholderData,
        initialData,
    });
}
