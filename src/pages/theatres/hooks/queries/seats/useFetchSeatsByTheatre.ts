import RequestQueryFilters from "@/common/type/request/RequestQueryFilters.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import SeatRepository from "@/pages/seats/repositories/SeatRepository.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

export default function useFetchSeatsByTheatre(
    {theatreID, queries = {}}: {theatreID: ObjectId, queries?: RequestQueryFilters}
): UseQueryResult<unknown, HttpResponseError> {
    const filters = {...queries, theatre: theatreID};

    const fetchSeats = useQueryFnHandler({
        action: () => SeatRepository.getAll({filters}),
        errorMessage: "Failed to fetch seats for theatre",
    });

    return useQuery({
        queryKey: ["fetch_seats_by_theatre"],
        queryFn: fetchSeats,
    });
}