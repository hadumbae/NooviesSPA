import {QueryFilters} from "@tanstack/react-query";
import PersonRepository from "@/pages/persons/repositories/PersonRepository.ts";
import filterNullAttributes from "@/common/utility/filterNullAttributes.ts";
import {PaginatedPersons, PaginatedPersonsSchema} from "@/pages/persons/schema/PersonPaginationSchema.ts";
import useFetchSchemaData from "@/common/hooks/useFetchSchemaData.ts";

export default function useFetchPaginatedPersons(
    {page, perPage, filters} : {page: number, perPage: number, filters: QueryFilters}
) {
    const filteredQueries = filterNullAttributes(filters);
    const action = () => PersonRepository.paginated({queries: {page, perPage, filteredQueries}});

    return useFetchSchemaData<
        typeof PaginatedPersonsSchema,
        PaginatedPersons
    >({
        queryKey: 'fetch_paginated_persons',
        schema: PaginatedPersonsSchema,
        action,
    });
}