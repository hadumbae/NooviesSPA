import QueryFilters from "@/common/type/QueryFilters.ts";
import filterEmptyAttributes from "@/common/utility/filterEmptyAttributes.ts";
import ShowingRepository from "@/pages/showings/repositories/ShowingRepository.ts";
import {PaginatedShowings, PaginatedShowingSchema} from "@/pages/showings/schema/ShowingPaginationSchema.ts";
import useFetchValidatedDataWithRedirect from "@/common/hooks/validation/useFetchValidatedDataWithRedirect.ts";

interface Params {
    page: number,
    perPage: number,
    populate?: boolean,
    filters?: QueryFilters,
}

export const useFetchPaginatedShowings = (params: Params) => {
    const {page = 1, perPage = 100, populate = false, filters = {}} = params;

    const filteredQueries = filterEmptyAttributes(filters);

    const queryKey = ["fetch_paginated_showings", {page, perPage, populate, filters: filteredQueries}];
    const schema = PaginatedShowingSchema;
    const action = () => ShowingRepository.paginated({filters: {page, perPage, ...filteredQueries}, populate});

    return useFetchValidatedDataWithRedirect<typeof PaginatedShowingSchema, PaginatedShowings>({
        queryKey,
        schema,
        action
    });
}