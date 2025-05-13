import ShowingSeatRepository from "@/pages/showings/repositories/ShowingSeatRepository.ts";
import {SeatArray, SeatArraySchema} from "@/pages/seats/schema/SeatSchema.ts";
import useFetchValidatedDataWithRedirect from "@/common/hooks/validation/useFetchValidatedDataWithRedirect.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";

interface Params {
    showingID: ObjectId;
    mapped?: boolean;
    populate?: boolean;
}

export default function useFetchSeatsForShowing(params: Params) {
    const { showingID, mapped = false, populate = false } = params;

    const queryKey = ["fetch_all_showing_seats", {showingID, mapped, populate}];
    const schema = SeatArraySchema;
    const action = () => ShowingSeatRepository.fetchSeatsForShowing({showingID, mapped, populate});

    return useFetchValidatedDataWithRedirect<typeof SeatArraySchema, SeatArray>({queryKey, schema, action});
}