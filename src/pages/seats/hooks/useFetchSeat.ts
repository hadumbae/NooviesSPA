import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import useFetchSchemaData from "@/common/hooks/validation/useFetchSchemaData.ts";
import {Seat, SeatSchema} from "@/pages/seats/schema/SeatSchema.ts";
import SeatRepository from "@/pages/seats/repositories/SeatRepository.ts";

export default function useFetchSeat({_id}: { _id: ObjectId }) {
    const queryKey = "fetch_single_seat";
    const schema = SeatSchema;
    const action = () => SeatRepository.get({_id});

    return useFetchSchemaData<typeof SeatSchema, Seat>({queryKey, schema, action});
}