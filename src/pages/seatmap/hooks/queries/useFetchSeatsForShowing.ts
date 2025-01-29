import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import {Seat, SeatArraySchema} from "@/pages/seats/schema/SeatSchema.ts";
import SeatRepository from "@/pages/seats/repositories/SeatRepository.ts";
import useFetchSchemaData from "@/common/hooks/validation/useFetchSchemaData.ts";

interface Params {
    theatreID: ObjectId;
    screenID: ObjectId;
}

export default function useFetchSeatsForShowing({ theatreID, screenID }: Params) {
    const filters = {theatre: theatreID, screen: screenID};

    const queryKey = "fetch_all_showing_seats";
    const schema = SeatArraySchema;
    const action = () => SeatRepository.getAll({filters});

    return useFetchSchemaData<typeof SeatArraySchema, Seat[]>({schema, action, queryKey});
}