import QueryFilters from "@/common/type/QueryFilters.ts";
import {useQuery} from "@tanstack/react-query";
import useFetchErrorHandler from "@/common/handlers/query/handleFetchError.ts";
import GenreRepository from "@/pages/genres/repositories/GenreRepository.ts";
import filterEmptyAttributes from "@/common/utility/filterEmptyAttributes.ts";
import parseResponseData from "@/common/utility/query/parseResponseData.ts";
import {PaginatedGenres, PaginatedGenresSchema} from "@/pages/genres/schema/GenrePaginationSchema.ts";

export default function useFetchPaginatedGenres(
    {page, perPage, queries}: {page: number, perPage: number, queries: QueryFilters}
) {
    const fetchGenres = async () => {
        const filteredQueries = filterEmptyAttributes(queries);
        const fetchQueryFn = () => GenreRepository.paginated({filters: {page, perPage, ...filteredQueries}});

        const {result} = await useFetchErrorHandler({fetchQueryFn});

        return parseResponseData<typeof PaginatedGenresSchema, PaginatedGenres>({
            schema: PaginatedGenresSchema,
            data: result
        });
    }

    return useQuery({
        queryKey: ['fetch_paginated_genres'],
        queryFn: fetchGenres,
    });
}