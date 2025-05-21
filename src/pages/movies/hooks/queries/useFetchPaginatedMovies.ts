import QueryFilters from "@/common/type/QueryFilters.ts";
import filterEmptyAttributes from "@/common/utility/filterEmptyAttributes.ts";
import useFetchValidatedDataWithRedirect from "@/common/hooks/validation/useFetchValidatedDataWithRedirect.ts";
import {PaginatedMovies, PaginatedMovieSchema} from "@/pages/movies/schema/model/MoviePaginationSchema.ts";
import MovieRepository from "@/pages/movies/repositories/MovieRepository.ts";

interface FetchParams {
    page: number,
    perPage: number,
    filters?: QueryFilters,
    populate?: boolean
}

export const useFetchPaginatedMovies = (
    {page, perPage, filters = {}, populate = false}: FetchParams
) => {
    const filteredQueries = filterEmptyAttributes(filters);

    const queryKey = ["fetch_paginated_movies", {page, perPage, populate, filters: filteredQueries}];
    const schema = PaginatedMovieSchema;
    const action = () => MovieRepository.paginated({populate, filters: {page, perPage, filteredQueries}});

    return useFetchValidatedDataWithRedirect<typeof schema, PaginatedMovies>({queryKey, schema, action});
}