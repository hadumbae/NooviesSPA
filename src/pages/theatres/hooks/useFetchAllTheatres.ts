import QueryFilters from "@/common/type/QueryFilters.ts";
import useFetchSchemaData from "@/common/hooks/useFetchSchemaData.ts";
import {TheatreArray, TheatreArraySchema} from "@/pages/theatres/schema/TheatreSchema.ts";
import TheatreRepository from "@/pages/theatres/repositories/TheatreRepository.ts";

export default function useFetchAllTheatres(params?: {filters?: QueryFilters}) {
    const {filters = {}} = params || {};

    const queryKey = "fetch_all_seats";
    const schema = TheatreArraySchema;
    const action = () => TheatreRepository.getAll({filters});

    return useFetchSchemaData<typeof schema, TheatreArray>({schema, action, queryKey});
}