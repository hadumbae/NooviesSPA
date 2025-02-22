import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import ShowingSeatRepository from "@/pages/showings/repositories/ShowingSeatRepository.ts";
import useQueryWithRedirect from "@/common/hooks/errors/useQueryWithRedirect.ts";
import handleFetchError from "@/common/handlers/query/handleFetchError.ts";

interface Params {
    showingID: ObjectId;
    mapped?: boolean;
    populate?: boolean;
}

export default function useFetchSeatsForShowing(params: Params) {
    const { showingID, mapped = false, populate = false } = params;

    const queryKey = "fetch_all_showing_seats";

    const fetchSeats = async () => {
        const action = () => ShowingSeatRepository.fetchSeatsForShowing({showingID, mapped, populate});
        const {result} = await handleFetchError({fetchQueryFn: action});
        return result;
    }

    return useQueryWithRedirect({
        queryKey: [queryKey],
        queryFn: fetchSeats,
    });
}