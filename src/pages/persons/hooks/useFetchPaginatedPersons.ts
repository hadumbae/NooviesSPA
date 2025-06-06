import {QueryFilters} from "@tanstack/react-query";
import PersonRepository from "@/pages/persons/repositories/PersonRepository.ts";
import filterEmptyAttributes from "@/common/utility/filterEmptyAttributes.ts";
import {PaginatedPersons, PaginatedPersonsSchema} from "@/pages/persons/schema/PersonPaginationSchema.ts";
import useFetchValidatedDataWithRedirect from "@/common/hooks/validation/useFetchValidatedDataWithRedirect.ts";

export default function useFetchPaginatedPersons(
    {page, perPage, filters}: { page: number, perPage: number, filters: QueryFilters }
) {
    const filteredQueries = filterEmptyAttributes(filters);

    const queryKey = ['fetch_paginated_persons', {page, perPage, filters: filteredQueries}];
    const action = () => PersonRepository.paginated({filters: {page, perPage, filteredQueries}});
    const schema = PaginatedPersonsSchema;

    return useFetchValidatedDataWithRedirect<typeof PaginatedPersonsSchema, PaginatedPersons>({
        queryKey,
        schema,
        action
    });
}