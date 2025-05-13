import SeatMapRepository from "@/pages/seatmap/repositories/SeatMapRepository.ts";
import {SeatMap, SeatMapSchema} from "@/pages/seatmap/schema/SeatMapSchema.ts";
import useFetchValidatedDataWithRedirect from "@/common/hooks/validation/useFetchValidatedDataWithRedirect.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";

export default function useFetchSeatMap({_id, populate}: {_id: ObjectId, populate?: boolean}) {
    const queryKey = ["fetch_single_seat_map", {_id, populate}];
    const action = () => SeatMapRepository.get({_id: _id, populate});
    const schema = SeatMapSchema;

    return useFetchValidatedDataWithRedirect<typeof SeatMapSchema, SeatMap>({queryKey, action, schema});
}