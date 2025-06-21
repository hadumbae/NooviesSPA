import SeatRepository from "@/pages/seats/repositories/SeatRepository.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";

/**
 * React Query hook to fetch a single seat map by its ID.
 *
 * This hook retrieves seat map data from the backend, using the provided ObjectId,
 * and optionally populates referenced fields depending on the `populate` flag.
 *
 * @param _id - The ObjectId of the seat map to retrieve
 * @param populate - Whether to populate referenced fields (optional)
 *
 * @returns A React Query result object containing the seat map data and metadata
 *
 * @example
 * ```ts
 * const { data, isLoading, error } = useFetchSeatMap({ _id: someId, populate: true });
 * ```
 */
export default function useFetchSeat({_id, populate = false}: { _id: ObjectId, populate?: boolean }): UseQueryResult {
    const queryKey = ["fetch_single_seat", {_id, populate}];
    const fetchSeat = useQueryFnHandler({
        action: () => SeatRepository.get({_id, populate}),
        errorMessage: "Failed to fetch seat data. Please try again.",
    });

    return useQuery({
        queryKey,
        queryFn: fetchSeat
    });
}