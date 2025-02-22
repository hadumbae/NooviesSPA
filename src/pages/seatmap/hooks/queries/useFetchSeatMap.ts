import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import SeatMapRepository from "@/pages/seatmap/repositories/SeatMapRepository.ts";
import useQueryWithRedirect from "@/common/hooks/errors/useQueryWithRedirect.ts";
import handleFetchError from "@/common/handlers/query/handleFetchError.ts";

export default function useFetchSeatMap({_id, populate}: {_id: ObjectId, populate?: boolean}) {
    const queryKey = "fetch_single_seat_map";
    const fetchSeatMap = async () => {
        const action = () => SeatMapRepository.get({_id: _id, populate});
        const {result} = await handleFetchError({fetchQueryFn: action});
        return result;
    }

    return useQueryWithRedirect({
        queryKey: [queryKey],
        queryFn: fetchSeatMap,
    });
}