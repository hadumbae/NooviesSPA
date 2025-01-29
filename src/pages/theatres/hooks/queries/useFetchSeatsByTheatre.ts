import QueryFilters from "@/common/type/QueryFilters.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import useFetchErrorHandler from "@/common/handlers/query/FetchErrorHandler.ts";
import SeatRepository from "@/pages/seats/repositories/SeatRepository.ts";
import parseResponseData from "@/common/utility/query/parseResponseData.ts";
import {SeatArray, SeatArraySchema} from "@/pages/seats/schema/SeatSchema.ts";

export default function useFetchSeatsByTheatre(
    {theatreID, queries = {}}: {theatreID: ObjectId, queries?: QueryFilters}
): UseQueryResult<SeatArray> {
    const filters = {...queries, theatre: theatreID};

    const queryKey = ["fetch_seats_by_theatre"];
    const queryFn = async () => {
        const schema = SeatArraySchema;
        const action = () => SeatRepository.getAll({filters});
        const {result} = await useFetchErrorHandler({fetchQueryFn: action});

        return parseResponseData({schema, data: result});
    }

    return useQuery<SeatArray>({queryKey, queryFn});
}