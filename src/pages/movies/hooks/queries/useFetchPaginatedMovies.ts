import QueryFilters from "@/common/type/QueryFilters.ts";
import filterEmptyAttributes from "@/common/utility/filterEmptyAttributes.ts";
import useFetchValidatedDataWithRedirect from "@/common/hooks/validation/useFetchValidatedDataWithRedirect.ts";
import {PaginatedMovies, PaginatedMovieSchema} from "@/pages/movies/schema/MoviePaginationSchema.ts";
import MovieRepository from "@/pages/movies/repositories/MovieRepository.ts";

export const useFetchPaginatedMovies = (
    {page, perPage, filters = {}}: {page: number, perPage: number, filters?: QueryFilters}
) => {
    const filteredQueries = filterEmptyAttributes(filters);

    const queryKey = ["fetch_paginated_movies", {page, perPage, filters: filteredQueries}];
    const schema = PaginatedMovieSchema;
    const action = () => MovieRepository.paginated({filters: {page, perPage, filteredQueries}});

    return useFetchValidatedDataWithRedirect<typeof schema, PaginatedMovies>({queryKey, schema, action});
}