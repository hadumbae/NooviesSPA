import SeatRepository from "@/pages/seats/repositories/SeatRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {FetchByIDParams} from "@/common/type/query/FetchByIDParams.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";

type FetchParams<TData = unknown> = FetchByIDParams & UseQueryOptions<TData>;

/**
 * React Query hook to fetch a single seat by its ID.
 *
 * This hook retrieves seat data from the backend using the provided `_id`.
 * It supports optional population of referenced fields (`populate`) and inclusion of virtual fields (`virtuals`).
 * Additional React Query options such as `enabled`, `staleTime`, `initialData`, and `placeholderData` are supported.
 *
 * @template TData - The expected type of the returned seat data.
 *
 * @param params - Configuration object for fetching the seat:
 *   - `_id`: The ObjectId of the seat to retrieve.
 *   - `populate` (optional): Whether to populate referenced fields (default: `false`).
 *   - `virtuals` (optional): Whether to include virtual fields (default: `false`).
 *   - `enabled` (optional): Whether the query is enabled (default: `true`).
 *   - `staleTime` (optional): Duration in milliseconds before cached data is considered stale (default: `60_000`).
 *   - `initialData` (optional): Initial data for the query.
 *   - `placeholderData` (optional): Function to provide placeholder data while fetching.
 *
 * @returns A `UseQueryResult<TData>` containing:
 *   - `data`: The fetched seat data (or `undefined` if not yet fetched).
 *   - `isLoading`, `isError`, `error`, and other React Query metadata.
 *
 * @example
 * ```ts
 * const { data: seat, isLoading, error } = useFetchSeat<{ row: string; seatNumber: number }>({
 *   _id: someSeatId,
 *   populate: true,
 * });
 * ```
 */
export default function useFetchSeat<TData = unknown>(
    params: FetchParams<TData>
): UseQueryResult<TData> {
    const {
        _id,
        populate = false,
        virtuals = false,
        enabled = true,
        staleTime = 1000 * 60,
        initialData,
        placeholderData = (previousData: TData | undefined) => previousData,
    } = params;

    const queryKey = ["fetch_single_seat", {_id, populate, virtuals}];
    const fetchSeat = useQueryFnHandler({
        action: () => SeatRepository.get({_id, populate, virtuals}),
        errorMessage: "Failed to fetch seat data. Please try again.",
    });

    return useQuery({
        queryKey,
        queryFn: fetchSeat,
        enabled,
        staleTime,
        initialData,
        placeholderData,
    });
}
