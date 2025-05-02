import QueryFilters from "@/common/type/QueryFilters.ts";
import filterEmptyAttributes from "@/common/utility/filterEmptyAttributes.ts";
import ShowingRepository from "@/pages/showings/repositories/ShowingRepository.ts";
import handleFetchError from "@/common/handlers/query/handleFetchError.ts";
import useQueryWithRedirect from "@/common/hooks/errors/useQueryWithRedirect.ts";

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

    const queryKey = ["fetch_paginated_showings"];

    const filteredQueries = filterEmptyAttributes(filters);
    const paginatedFilters = {filteredQueries, page, perPage};

    const fetchPaginatedShowings = async () => {
        const action = () => ShowingRepository.paginated({filters: paginatedFilters, populate});
        const {result} = await handleFetchError({fetchQueryFn: action});
        return result;
    }

    return useQueryWithRedirect({
        queryKey,
        queryFn: fetchPaginatedShowings,
    });
}