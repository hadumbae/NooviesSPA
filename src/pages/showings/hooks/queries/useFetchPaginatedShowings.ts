import QueryFilters from "@/common/type/QueryFilters.ts";
import filterNullAttributes from "@/common/utility/filterNullAttributes.ts";
import useFetchSchemaData from "@/common/hooks/validation/useFetchSchemaData.ts";
import {PaginatedShowings, PaginatedShowingSchema} from "@/pages/showings/schema/ShowingPaginationSchema.ts";
import ShowingRepository from "@/pages/showings/repositories/ShowingRepository.ts";

interface Params {
    page: number,
    perPage: number,
    populate?: boolean,
    filters?: QueryFilters,
}

export const useFetchPaginatedShowings = (params: Params) => {
    const {
        page = 1,
        perPage = 100,
        populate = true,
        filters = {},
    } = params;

    const filteredQueries = filterNullAttributes(filters);

    const queryKey = "fetch_paginated_showings";
    const schema = PaginatedShowingSchema;

    const paginatedFilters = {filteredQueries, page, perPage, populate};
    const action = () => ShowingRepository.paginated({filters: paginatedFilters});

    return useFetchSchemaData<typeof schema, PaginatedShowings>({queryKey, schema, action});
}