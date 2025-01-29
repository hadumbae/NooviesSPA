// TODO - Seat Map Delete Mutation

import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import useFetchErrorHandler from "@/common/handlers/query/FetchErrorHandler.ts";
import SeatMapRepository from "@/pages/seatmap/repositories/SeatMapRepository.ts";

interface Params {
    onDelete?: () => void;
}

export default function useSeatMapDeleteMutation({onDelete}: Params) {
    const queryClient = useQueryClient();

    const mutationKey = ['delete_seat_map'];

    const deleteSeatMap = async (seatMapID: string) => {
        const fetchQueryFn = () => SeatMapRepository.delete({_id: seatMapID});
        await useFetchErrorHandler({fetchQueryFn});
    };

    const onSuccess = async () => {
        await queryClient.invalidateQueries({queryKey: ["fetch_showing_seating"]});
        toast.success("Seat Map Deleted.");
        onDelete && onDelete();
    }

    const onError = (error: Error) => {
        console.error("[Delete Seat Map Error] | ", error.message);
        toast.error("Oops. Something went wrong deleting seat map. Please try again.");
    }

    return useMutation({
        mutationKey,
        mutationFn: deleteSeatMap,
        onSuccess,
        onError,
    });
}