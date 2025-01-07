import QueryFilters from "@/common/type/QueryFilters.ts";
import useFetchSchemaData from "@/common/hooks/useFetchSchemaData.ts";
import {SeatArray, SeatArraySchema} from "@/pages/seats/schema/SeatSchema.ts";
import SeatRepository from "@/pages/seats/repositories/SeatRepository.ts";

export default function useFetchAllSeats(params?: {filters?: QueryFilters}) {
    const {filters = {}} = params || {};

    const queryKey = "fetch_all_seats";
    const schema = SeatArraySchema;
    const action = () => SeatRepository.getAll({filters});

    return useFetchSchemaData<typeof SeatArraySchema, SeatArray>({schema, action, queryKey});
}