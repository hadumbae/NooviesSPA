import QueryFilters from "@/common/type/QueryFilters.ts";
import filterNullAttributes from "@/common/utility/filterNullAttributes.ts";
import useFetchSchemaData from "@/common/hooks/useFetchSchemaData.ts";
import {PaginatedSeats, PaginatedSeatSchema} from "@/pages/seats/schema/SeatPaginationSchema.ts";
import SeatRepository from "@/pages/seats/repositories/SeatRepository.ts";

export const useFetchPaginatedSeats = (
    {page, perPage, filters = {}}: {page: number, perPage: number, filters?: QueryFilters}
) => {
    const filteredQueries = filterNullAttributes(filters);

    const queryKey = "fetch_paginated_seats";
    const schema = PaginatedSeatSchema;
    const action = () => SeatRepository.paginated({queries: {page, perPage, filteredQueries}});

    return useFetchSchemaData<typeof PaginatedSeatSchema, PaginatedSeats>({queryKey, schema, action});
}