import {useMutation} from "@tanstack/react-query";
import useFetchErrorHandler from "@/common/handlers/query/handleFetchError.ts";
import SeatMapShowingRepository from "@/pages/seatmap/repositories/SeatMapShowingRepository.ts";
import {SeatMap, SeatMapSchema} from "@/pages/seatmap/schema/SeatMapSchema.ts";
import parseResponseData from "@/common/utility/query/parseResponseData.ts";
import {toast} from "react-toastify";

interface Params {
    onToggle?: (seatMap: SeatMap) => void
}

export default function useSeatMapUpdateAvailabilityMutation(params?: Params) {
    const {onToggle} = params || {};
    const mutationKey = ['toggle_seat_map_availability'];

    const toggleAvailability = async (seatMapID: string) => {
        const action = () => SeatMapShowingRepository.toggleSeatMapAvailability({seatMapID});

        const {result} = await useFetchErrorHandler({fetchQueryFn: action});
        return parseResponseData<typeof SeatMapSchema, SeatMap>({data: result, schema: SeatMapSchema});
    }

    const onSuccess = (seatMap: SeatMap) => {
        toast.success("Seat Map updated.");
        onToggle && onToggle(seatMap);
    }

    const onError = (error: Error) => {
        console.error("[Create Seat Map Error] | ", error.message);
        toast.error("Error: Failed to toggle seat availability. Please try again.");
    }

    return useMutation({
        mutationKey,
        mutationFn: toggleAvailability,
        onSuccess,
        onError
    });
}