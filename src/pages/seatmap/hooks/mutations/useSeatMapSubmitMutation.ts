import {useMutation} from "@tanstack/react-query";
import {SeatMapSubmit} from "@/pages/seatmap/schema/SeatMapSubmitSchema.ts";
import {SeatMap, SeatMapSchema} from "@/pages/seatmap/schema/SeatMapSchema.ts";
import SeatMapRepository from "@/pages/seatmap/repositories/SeatMapRepository.ts";
import useFetchErrorHandler from "@/common/handlers/query/FetchErrorHandler.ts";
import parseResponseData from "@/common/utility/query/parseResponseData.ts";

interface Params {
    seatMap?: SeatMap;
}

export default function useSeatMapSubmitMutation(params?: Params) {
    const {seatMap} = params || {};

    const mutationKey = ['submit_single_seat_map'];

    const mutationFn = async (values: SeatMapSubmit) => {
        const repository = SeatMapRepository;
        const action = seatMap
            ? () => repository.update({_id: seatMap._id, data: values})
            : () => repository.create({data: values});

        const {result} = await useFetchErrorHandler({fetchQueryFn: action});
        return parseResponseData<typeof SeatMapSchema, SeatMap>({schema: SeatMapSchema, data: result});
    };

    const onSuccess = () => {};

    const onError = () => {};

    return useMutation({
        mutationKey,
        mutationFn,
        onSuccess,
        onError,
    });
}