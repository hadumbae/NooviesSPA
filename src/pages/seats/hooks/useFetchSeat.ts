import useFetchValidatedDataWithRedirect from "@/common/hooks/validation/useFetchValidatedDataWithRedirect.ts";
import {Seat, SeatSchema} from "@/pages/seats/schema/SeatSchema.ts";
import SeatRepository from "@/pages/seats/repositories/SeatRepository.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";

export default function useFetchSeat({_id, populate = false}: { _id: ObjectId, populate?: boolean }) {
    const queryKey = ["fetch_single_seat", {_id, populate}];
    const schema = SeatSchema;
    const action = () => SeatRepository.get({_id, populate});

    return useFetchValidatedDataWithRedirect<typeof SeatSchema, Seat>({queryKey, schema, action});
}