import QueryFilters from "@/common/type/QueryFilters.ts";
import filterNullAttributes from "@/common/utility/filterNullAttributes.ts";
import useFetchSchemaData from "@/common/hooks/useFetchSchemaData.ts";
import {PaginatedTheatres, PaginatedTheatreSchema} from "@/pages/theatres/schema/TheatrePaginationSchema.ts";
import TheatreRepository from "@/pages/theatres/repositories/TheatreRepository.ts";

export const useFetchPaginatedTheatres = (
    {page, perPage, filters = {}}: {page: number, perPage: number, filters?: QueryFilters}
) => {
    const filteredQueries = filterNullAttributes(filters);

    const queryKey = "fetch_paginated_theatres";
    const schema = PaginatedTheatreSchema;
    const action = () => TheatreRepository.paginated({queries: {page, perPage, filteredQueries}});

    return useFetchSchemaData<typeof schema, PaginatedTheatres>({queryKey, schema, action});
}