import SeatMapRepository from "@/pages/seatmap/repositories/SeatMapRepository.ts";
import {useQuery} from "@tanstack/react-query";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {FetchByIDParams} from "@/common/type/query/FetchByIDParams.ts";

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
export default function useFetchSeatMap({_id, populate}: FetchByIDParams) {
    const queryKey = ["fetch_single_seat_map", {_id, populate}];
    const fetchSeatMap = useQueryFnHandler({
        action: () => SeatMapRepository.get({_id, populate}),
        errorMessage: "Failed to fetch seat map data. Please try again."
    });

    return useQuery({
        queryKey,
        queryFn: fetchSeatMap,
    });
}