import {EntityPaginatedQuery, RequestOptions} from "@/common/type/repositories/EntityRequestParamTypes.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import SeatRepository from "@/pages/seats/repositories/SeatRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {SeatQueryFilters} from "@/pages/seats/schema/queries/SeatFilter.types.ts";

type FetchQueries = RequestOptions & EntityPaginatedQuery & SeatQueryFilters;

/**
 * React Query hook for fetching a paginated list of seats based on filters and options.
 *
 * @template TData - The expected shape of the returned data (e.g., paginated response with seat entries).
 *
 * @param queries - An object combining request options, pagination parameters, and seat-specific filters.
 *
 * @returns A {@link UseQueryResult} containing the fetched seat data, loading state, and error state.
 *
 * @example
 * ```ts
 * const { data, isLoading } = useFetchSeats<PaginatedSeats>({
 *   page: 1,
 *   limit: 20,
 *   theatre: "abc123",
 *   screen: "xyz789",
 * });
 * ```
 */
export default function useFetchSeats<TData>(queries: FetchQueries): UseQueryResult<TData> {
    const queryKey = ["fetch_seats_by_query", queries];

    const fetchSeats = useQueryFnHandler<TData>({
        action: () => SeatRepository.query({queries}),
        errorMessage: "Failed to fetch seats. Please try again.",
    });

    return useQuery({
        queryKey,
        queryFn: fetchSeats,
        staleTime: 1000 * 60,
        placeholderData: (previousData) => previousData,
    });
}