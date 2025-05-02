import QueryFilters from "@/common/type/QueryFilters.ts";
import filterEmptyAttributes from "@/common/utility/filterEmptyAttributes.ts";
import useFetchValidatedDataWithRedirect from "@/common/hooks/validation/useFetchValidatedDataWithRedirect.ts";
import {PaginatedSeats, PaginatedSeatSchema} from "@/pages/seats/schema/SeatPaginationSchema.ts";
import SeatRepository from "@/pages/seats/repositories/SeatRepository.ts";

export const useFetchPaginatedSeats = (
    {page, perPage, filters = {}}: {page: number, perPage: number, filters?: QueryFilters}
) => {
    const filteredQueries = filterEmptyAttributes(filters);

    const queryKey = "fetch_paginated_seats";
    const schema = PaginatedSeatSchema;
    const action = () => SeatRepository.paginated({filters: {page, perPage, filteredQueries}});

    return useFetchValidatedDataWithRedirect<typeof PaginatedSeatSchema, PaginatedSeats>({queryKey, schema, action});
}