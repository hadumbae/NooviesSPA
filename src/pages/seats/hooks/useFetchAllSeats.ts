import QueryFilters from "@/common/type/QueryFilters.ts";
import SeatRepository from "@/pages/seats/repositories/SeatRepository.ts";
import handleFetchError from "@/common/handlers/query/handleFetchError.ts";
import useQueryWithRedirect from "@/common/hooks/errors/useQueryWithRedirect.ts";

export default function useFetchAllSeats(
    {filters = {}, populate = false}: {filters?: QueryFilters, populate?: boolean} = {}
) {
    const queryKey = "fetch_all_seats";

    const fetchSeatsWithFilter = async () => {
        const action = () => SeatRepository.getAll({filters, populate});
        const {result} = await handleFetchError({fetchQueryFn: action});
        return result;
    }

    return useQueryWithRedirect({
        queryKey: [queryKey],
        queryFn: fetchSeatsWithFilter,
    });
}