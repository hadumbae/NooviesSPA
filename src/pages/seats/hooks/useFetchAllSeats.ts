import QueryFilters from "@/common/type/QueryFilters.ts";
import SeatRepository from "@/pages/seats/repositories/SeatRepository.ts";
import {SeatArray, SeatArraySchema} from "@/pages/seats/schema/SeatSchema.ts";
import useFetchValidatedDataWithRedirect from "@/common/hooks/validation/useFetchValidatedDataWithRedirect.ts";
import filterEmptyAttributes from "@/common/utility/filterEmptyAttributes.ts";

export default function useFetchAllSeats(
    {filters = {}, populate = false}: { filters?: QueryFilters, populate?: boolean } = {}
) {
    const filteredQueries = filterEmptyAttributes(filters);

    const queryKey = ["fetch_all_seats", {populate, filters: filteredQueries}];
    const action = () => SeatRepository.getAll({filters, populate});
    const schema = SeatArraySchema;

    return useFetchValidatedDataWithRedirect<typeof SeatArraySchema, SeatArray>({queryKey, action, schema});
}