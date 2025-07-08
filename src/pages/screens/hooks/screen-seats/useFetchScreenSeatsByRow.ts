import {FetchByIDParams} from "@/common/type/query/FetchByIDParams.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import ScreenSeatRepository from "@/pages/screens/repositories/ScreenSeatRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {SeatsByRow} from "@/pages/screens/schema/screen/ScreenSeat.types.ts";

export default function useFetchScreenSeatsByRow<TReturns = SeatsByRow>(
    {_id, ...queries}: FetchByIDParams
): UseQueryResult<TReturns, Error> {
    const queryKey = ["fetch_screen_seats_by_row", {_id, ...queries}];

    const fetchSeats = useQueryFnHandler({
        action: () => ScreenSeatRepository.fetchSeatsByRow({_id, ...queries}),
        errorMessage: "Failed to fetch seats. Please try again.",
    });

    return useQuery({
        queryKey,
        queryFn: fetchSeats,
    });
}