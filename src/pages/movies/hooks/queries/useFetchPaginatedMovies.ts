import QueryFilters from "@/common/type/QueryFilters.ts";
import filterNullAttributes from "@/common/utility/filterNullAttributes.ts";
import useFetchSchemaData from "@/common/hooks/validation/useFetchSchemaData.ts";
import {PaginatedMovies, PaginatedMovieSchema} from "@/pages/movies/schema/MoviePaginationSchema.ts";
import MovieRepository from "@/pages/movies/repositories/MovieRepository.ts";

export const useFetchPaginatedMovies = (
    {page, perPage, filters = {}}: {page: number, perPage: number, filters?: QueryFilters}
) => {
    const filteredQueries = filterNullAttributes(filters);

    const queryKey = "fetch_paginated_movies";
    const schema = PaginatedMovieSchema;
    const action = () => MovieRepository.paginated({queries: {page, perPage, filteredQueries}});

    return useFetchSchemaData<typeof schema, PaginatedMovies>({queryKey, schema, action});
}