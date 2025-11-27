import {useMutation, UseMutationResult} from "@tanstack/react-query";
import SeatMapShowingRepository from "@/pages/seatmap/repositories/SeatMapShowingRepository.ts";
import {toast} from "react-toastify";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {SeatMapSchema} from "@/pages/seatmap/schema/model/SeatMap.schema.ts";
import {SeatMap} from "@/pages/seatmap/schema/model/SeatMap.types.ts";

export default function useSeatMapUpdateAvailabilityMutation(
    params: MutationOnSubmitParams<SeatMap> = {}
): UseMutationResult<SeatMap, unknown, string> {
    const {onSubmitSuccess, onSubmitError, successMessage, errorMessage} = params;
    const mutationKey = ['toggle_seat_map_availability'];

    const toggleAvailability = async (seatMapID: string) => {
        const {result} = await SeatMapShowingRepository.toggleSeatMapAvailability({seatMapID});

        const {data, success, error} = validateData({data: result, schema: SeatMapSchema});

        if (!success) {
            throw error;
        }

        return data;
    }

    const onSuccess = (seatMap: SeatMap) => {
        toast.success(successMessage ?? "Seat Map updated.");
        onSubmitSuccess?.(seatMap);
    }

    const onError = (error: unknown) => {
        const displayMessage = errorMessage ?? "Failed to toggle seat availability. Please try again.";
        handleMutationResponseError({error, displayMessage});
        onSubmitError?.(error);
    }

    return useMutation({
        mutationKey,
        mutationFn: toggleAvailability,
        onSuccess,
        onError
    });
}