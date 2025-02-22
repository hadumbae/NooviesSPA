import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import useFetchErrorHandler from "@/common/handlers/query/handleFetchError.ts";
import SeatMapShowingRepository from "@/pages/seatmap/repositories/SeatMapShowingRepository.ts";

interface Params {
    showingID: string;
    onCreate?: () => void;
}

export default function useShowingCreateSeatMapMutation({showingID, onCreate}: Params) {
    const mutationKey = ['create_showing_seat_map'];
    const mutationFn = async () => {
        const action = () => SeatMapShowingRepository.createSeatMap({showingID});
        await useFetchErrorHandler({fetchQueryFn: action});
    };

    const onSuccess = () => {
        toast.success("Seat Map Created Successfully.");
        onCreate && onCreate();
    }

    const onError = (error: Error) => {
        console.error("[Create Seat Map Error] | ", error.message);
        toast.error("Error: Failed To Create Seat Map. Please Try Again.");
    }

    return useMutation({mutationKey, mutationFn, onSuccess, onError});
}