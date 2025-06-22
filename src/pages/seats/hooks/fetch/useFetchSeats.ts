import {EntityPaginatedQuery, RequestOptions} from "@/common/type/repositories/EntityRequestParamTypes.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import SeatRepository from "@/pages/seats/repositories/SeatRepository.ts";
import {useQuery} from "@tanstack/react-query";
import {SeatQueryFilters} from "@/pages/seats/schema/queries/SeatFilter.types.ts";

type FetchQueries = RequestOptions & EntityPaginatedQuery & SeatQueryFilters;

export default function useFetchSeats(queries: FetchQueries) {
    const queryKey = ["fetch_seats_by_query", queries];

    const fetchSeats = useQueryFnHandler({
        action: () => SeatRepository.query({queries}),
        errorMessage: "Failed to fetch seats. Please try again.",
    });

    return useQuery({
        queryKey,
        queryFn: fetchSeats,
        staleTime: 1000 * 60,
        placeholderData: (previousData) => previousData,
    });
}