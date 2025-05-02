import QueryFilters from "@/common/type/QueryFilters.ts";
import filterEmptyAttributes from "@/common/utility/filterEmptyAttributes.ts";
import useFetchValidatedDataWithRedirect from "@/common/hooks/validation/useFetchValidatedDataWithRedirect.ts";
import {PaginatedTheatres, PaginatedTheatreSchema} from "@/pages/theatres/schema/TheatrePaginationSchema.ts";
import TheatreRepository from "@/pages/theatres/repositories/TheatreRepository.ts";

export const useFetchPaginatedTheatres = (
    {page, perPage, filters = {}}: {page: number, perPage: number, filters?: QueryFilters}
) => {
    const filteredQueries = filterEmptyAttributes(filters);

    const queryKey = "fetch_paginated_theatres";
    const schema = PaginatedTheatreSchema;
    const action = () => TheatreRepository.paginated({filters: {page, perPage, filteredQueries}});

    return useFetchValidatedDataWithRedirect<typeof schema, PaginatedTheatres>({queryKey, schema, action});
}