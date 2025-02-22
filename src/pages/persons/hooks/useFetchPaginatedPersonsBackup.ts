import {QueryFilters, useQuery} from "@tanstack/react-query";
import PersonRepository from "@/pages/persons/repositories/PersonRepository.ts";
import filterNullAttributes from "@/common/utility/filterNullAttributes.ts";
import useFetchErrorHandler from "@/common/handlers/query/handleFetchError.ts";
import parseResponseData from "@/common/utility/query/parseResponseData.ts";
import {PaginatedPersons, PaginatedPersonsSchema} from "@/pages/persons/schema/PersonPaginationSchema.ts";

export default function useFetchPaginatedPersons(
    {page, perPage, filters} : {page: number, perPage: number, filters: QueryFilters}
) {
    const fetchPaginatedPersons = async () => {
        const filteredQueries = filterNullAttributes(filters);
        const fetchQueryFn = () => PersonRepository.paginated({queries: {page, perPage, filteredQueries}});
        const {result} = await useFetchErrorHandler({fetchQueryFn});

        return parseResponseData<typeof PaginatedPersonsSchema, PaginatedPersons>({
            schema: PaginatedPersonsSchema,
            data: result,
        })
    }

    return useQuery({
        queryKey: ['fetch_paginated_persons'],
        queryFn: fetchPaginatedPersons
    });
}