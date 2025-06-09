import {PaginatedMovies} from "@/pages/movies/schema/model/pagination/MoviePaginationSchema.ts";
import MovieQueryRepository from "@/pages/movies/repositories/MovieQueryRepository.ts";
import filterEmptyAttributes from "@/common/utility/filterEmptyAttributes.ts";
import {MovieQueryParams} from "@/pages/movies/schema/queries/MovieQueryParamSchema.ts";
import {MovieSortParams} from "@/pages/movies/schema/queries/MovieSortParamSchema.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import throwResponseError from "@/common/utility/errors/throwResponseError.ts";

/**
 * Parameters used to fetch paginated movie data with query and sort options.
 */
type IPaginatedMovieParams = {
    /** The current page number (starts from 1). */
    page: number;

    /** The number of results to return per page. */
    perPage: number;

    /** Query filters for narrowing down results (e.g., title, genre). */
    query: MovieQueryParams;

    /** Sorting options (e.g., by release date or title). */
    sort: MovieSortParams;
};

/**
 * React Query hook for fetching a paginated list of movies with additional query and sort parameters.
 *
 * This hook uses `@tanstack/react-query` to retrieve paginated movie data from the backend. It extends
 * the base functionality by allowing for flexible query filtering and sorting, and is designed to work
 * with the `MovieQueryRepository.fetchPaginatedMoviesWithData` API method.
 *
 * @param params - Parameters used to query paginated movie data.
 * @param params.page - The current page number (starting from 1).
 * @param params.perPage - The number of movies to retrieve per page.
 * @param params.query - An object representing search filters (e.g., title, genre, release date).
 * @param params.sort - An object representing sorting options (e.g., by title or release date).
 *
 * @returns A `UseQueryResult` object containing the fetched paginated movie data and React Query state.
 *
 * @example
 * ```ts
 * const { data, isLoading, error } = useFetchPaginatedMoviesWithData({
 *   page: 1,
 *   perPage: 20,
 *   query: { title: "Avengers" },
 *   sort: { releaseDate: "desc" }
 * });
 * ```
 */
export default function useFetchPaginatedMoviesWithData(params: IPaginatedMovieParams): UseQueryResult<PaginatedMovies> {
    const {page, perPage, query, sort} = params;
    const filteredQuery = filterEmptyAttributes({...query, ...sort});

    const queryKey = [
        "fetch_paginated_movies_with_data",
        {page, perPage, query: filteredQuery},
    ];

    const action = async () => {
        const {result, response} = await MovieQueryRepository.fetchPaginatedMoviesWithData({
            page,
            perPage,
            queries: filteredQuery,
        });

        if (!response.ok) {
            const message = "Failed To Fetch Data. Please Try Again.";
            throwResponseError({response, result, message});
        }

        return result;
    }

    return useQuery({
        queryKey,
        queryFn: action,
    });
}