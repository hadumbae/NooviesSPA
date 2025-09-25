import { EntityPaginatedQuery, RequestOptions } from "@/common/type/repositories/EntityRequestParamTypes.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import SeatRepository from "@/pages/seats/repositories/SeatRepository.ts";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { SeatQueryFilters } from "@/pages/seats/schema/queries/SeatQueryOption.types.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import { UseQueryOptions } from "@/common/type/UseQueryOptions.ts";

type FetchParams<TData = unknown> = {
    queries: RequestOptions & EntityPaginatedQuery & SeatQueryFilters,
    options?: UseQueryOptions<TData>
};

/**
 * React Query hook for fetching a **paginated list of seats** from the backend.
 *
 * This hook supports filtering, pagination, and query options to integrate seamlessly
 * with React Query caching and background refetching.
 *
 * @template TData - The expected shape of the returned data (e.g., a paginated response containing seat entries).
 *
 * @param params - The configuration object:
 * - `queries`: Object that combines:
 *   - `RequestOptions` (sorting, projection, population flags, etc.)
 *   - `EntityPaginatedQuery` (pagination parameters like `page` and `limit`)
 *   - `SeatQueryFilters` (seat-specific filters such as `theatre`, `screen`, `row`, etc.)
 * - `options`: React Query options for controlling cache and fetch behavior:
 *   - `enabled` (default: `true`) — Whether the query should run automatically.
 *   - `staleTime` (default: `60_000`) — Time in ms before cached data is considered stale.
 *   - `initialData` (optional) — Preloaded data for hydration.
 *   - `placeholderData` (default: previous data) — Data shown while fetching.
 *
 * @returns A {@link UseQueryResult} containing:
 * - `data`: The fetched seat data (typed as `TData`)
 * - `isLoading`: Whether the query is currently loading.
 * - `isError` / `error`: Error state with {@link HttpResponseError}.
 * - Other React Query state helpers (`refetch`, `isFetching`, etc.)
 *
 * @example
 * ```ts
 * type PaginatedSeats = {
 *   items: Array<{ _id: string; row: string; seatNumber: number }>;
 *   total: number;
 *   page: number;
 *   limit: number;
 * };
 *
 * const { data, isLoading, error } = useFetchSeats<PaginatedSeats>({
 *   queries: {
 *     page: 1,
 *     limit: 20,
 *     theatre: "abc123",
 *     screen: "xyz789",
 *   },
 *   options: {
 *     staleTime: 5 * 60 * 1000, // 5 minutes
 *   },
 * });
 * ```
 */
export default function useFetchSeats<TData = unknown>(
    params: FetchParams<TData>
): UseQueryResult<TData, HttpResponseError> {
    const { queries, options } = params;
    const queryKey = ["fetch_seats_by_query", queries];

    const {
        enabled = true,
        staleTime = 1000 * 60,
        placeholderData = (previousData: TData | undefined) => previousData,
        initialData,
    } = options || {};

    const fetchSeats = useQueryFnHandler({
        action: () => SeatRepository.query({ queries }),
        errorMessage: "Failed to fetch seats. Please try again.",
    });

    return useQuery({
        queryKey,
        queryFn: fetchSeats,
        enabled,
        staleTime,
        initialData,
        placeholderData,
    });
}
