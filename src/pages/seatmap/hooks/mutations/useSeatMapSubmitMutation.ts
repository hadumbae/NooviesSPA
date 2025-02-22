import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {SeatMapSubmit} from "@/pages/seatmap/schema/SeatMapSubmitSchema.ts";
import {SeatMap, SeatMapSchema} from "@/pages/seatmap/schema/SeatMapSchema.ts";
import SeatMapRepository from "@/pages/seatmap/repositories/SeatMapRepository.ts";
import useFetchErrorHandler from "@/common/handlers/query/handleFetchError.ts";
import parseResponseData from "@/common/utility/query/parseResponseData.ts";
import {toast} from "react-toastify";
import MutationFormErrorHandler from "@/common/handlers/mutation/MutationFormErrorHandler.ts";
import {UseFormReturn} from "react-hook-form";

interface Params {
    form: UseFormReturn<SeatMapSubmit>;
    seatMap?: SeatMap;
    onSubmit?: (seatMap: SeatMap) => void
}

export default function useSeatMapSubmitMutation(params: Params): UseMutationResult<SeatMap, Error, SeatMapSubmit> {
    const {form, seatMap, onSubmit} = params;

    const mutationKey = ['submit_single_seat_map'];

    const mutationFn = async (values: SeatMapSubmit) => {
        const repository = SeatMapRepository;
        const action = seatMap
            ? () => repository.update({_id: seatMap._id, data: values})
            : () => repository.create({data: values});

        const {result} = await useFetchErrorHandler({fetchQueryFn: action});
        return parseResponseData<typeof SeatMapSchema, SeatMap>({schema: SeatMapSchema, data: result});
    };

    const onSuccess = (seatMap: SeatMap) => {
        toast.success("Success! Seat Map submitted.");
        onSubmit && onSubmit(seatMap);
    };

    const onError = MutationFormErrorHandler({form});

    return useMutation({
        mutationKey,
        mutationFn,
        onSuccess,
        onError,
    });
}