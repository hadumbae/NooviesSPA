import QueryFilters from "@/common/type/QueryFilters.ts";
import filterEmptyAttributes from "@/common/utility/filterEmptyAttributes.ts";
import ScreenRepository from "@/pages/screens/repositories/ScreenRepository.ts";
import {PaginatedScreens, PaginatedScreenSchema} from "@/pages/screens/schema/ScreenPaginationSchema.ts";
import useFetchValidatedDataWithRedirect from "@/common/hooks/validation/useFetchValidatedDataWithRedirect.ts";

export const useFetchPaginatedScreens = (
    params: {page: number, perPage: number, populate?: boolean, filters?: QueryFilters}
) => {
    const {page, perPage, populate = false, filters = {}} = params;

    const filteredQueries = filterEmptyAttributes(filters);

    const queryKey = ["fetch_paginated_screens", {page, perPage, populate, filters: filteredQueries}];
    const schema = PaginatedScreenSchema;
    const action = () => ScreenRepository.paginated({populate, filters: {page, perPage, filteredQueries}});

    return useFetchValidatedDataWithRedirect<typeof PaginatedScreenSchema, PaginatedScreens>({queryKey, schema, action});
}