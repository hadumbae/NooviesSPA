// import ShowingSeatRepository from "@/pages/showings/repositories/ShowingSeatRepository.ts";
// import {SeatArraySchema} from "@/pages/seats/schema/seat/Seat.schema.ts";
// import {SeatArray} from "@/pages/seats/schema/seat/Seat.types.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {useQuery} from "@tanstack/react-query";

interface Params {
    showingID: ObjectId;
    mapped?: boolean;
    populate?: boolean;
}

export default function useFetchSeatsForShowing(params: Params) {
    const { showingID, mapped = false, populate = false } = params;

    const queryKey = ["fetch_all_showing_seats", {showingID, mapped, populate}];
    // const schema = SeatArraySchema;
    // const action = () => ShowingSeatRepository.fetchSeatsForShowing({showingID, mapped, populate});

    return useQuery({
        queryKey
    })
}