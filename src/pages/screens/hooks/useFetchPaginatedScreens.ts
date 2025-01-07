import QueryFilters from "@/common/type/QueryFilters.ts";
import filterNullAttributes from "@/common/utility/filterNullAttributes.ts";
import ScreenRepository from "@/pages/screens/repositories/ScreenRepository.ts";
import {PaginatedScreens, PaginatedScreenSchema} from "@/pages/screens/schema/ScreenPaginationSchema.ts";
import useFetchSchemaData from "@/common/hooks/useFetchSchemaData.ts";

export const useFetchPaginatedScreens = (
    {page, perPage, filters = {}}: {page: number, perPage: number, filters?: QueryFilters}
) => {
    const filteredQueries = filterNullAttributes(filters);

    const queryKey = "fetch_paginated_screens";
    const schema = PaginatedScreenSchema;
    const action = () => ScreenRepository.paginated({queries: {page, perPage, filteredQueries}});

    return useFetchSchemaData<typeof PaginatedScreenSchema, PaginatedScreens>({queryKey, schema, action});
}