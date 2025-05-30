import {PaginatedMovies, PaginatedMovieSchema} from "@/pages/movies/schema/model/pagination/MoviePaginationSchema.ts";
import MovieQueryRepository from "@/pages/movies/repositories/MovieQueryRepository.ts";
import filterEmptyAttributes from "@/common/utility/filterEmptyAttributes.ts";
import useFetchValidatedDataWithRedirect from "@/common/hooks/validation/useFetchValidatedDataWithRedirect.ts";
import {MovieQueryParams} from "@/pages/movies/schema/queries/MovieQueryParamSchema.ts";
import {MovieSortParams} from "@/pages/movies/schema/queries/MovieSortParamSchema.ts";
import {UseQueryResult} from "@tanstack/react-query";

interface IPaginatedMovieParams {
    page: number;
    perPage: number;
    query: MovieQueryParams;
    sort: MovieSortParams;
}

export default function useFetchPaginatedMoviesWithData(params: IPaginatedMovieParams): UseQueryResult<PaginatedMovies> {
    const {page, perPage, query, sort} = params;
    const filteredQuery = filterEmptyAttributes({...query, ...sort});

    const queryKey = ["fetch_paginated_movies_with_data", {page, perPage, query: filteredQuery}];
    const schema = PaginatedMovieSchema;
    const action = () => MovieQueryRepository.fetchPaginatedMoviesWithData({page, perPage, queries: filteredQuery});

    return useFetchValidatedDataWithRedirect({queryKey, schema, action});
}