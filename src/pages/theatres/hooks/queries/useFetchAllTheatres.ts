import QueryFilters from "@/common/type/QueryFilters.ts";
import useFetchValidatedDataWithRedirect from "@/common/hooks/validation/useFetchValidatedDataWithRedirect.ts";
import {TheatreArray, TheatreArraySchema} from "@/pages/theatres/schema/TheatreSchema.ts";
import TheatreRepository from "@/pages/theatres/repositories/TheatreRepository.ts";
import filterEmptyAttributes from "@/common/utility/filterEmptyAttributes.ts";

export default function useFetchAllTheatres(params?: {filters?: QueryFilters, populate?: boolean}) {
    const {filters = {}, populate = false} = params || {};
    const filteredQueries = filterEmptyAttributes(filters);

    const queryKey = ["fetch_all_seats", {populate, filters: filteredQueries}];
    const schema = TheatreArraySchema;
    const action = () => TheatreRepository.getAll({populate, filters: filteredQueries});

    return useFetchValidatedDataWithRedirect<typeof schema, TheatreArray>({schema, action, queryKey});
}