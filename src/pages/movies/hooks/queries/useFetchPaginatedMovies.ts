import QueryFilters from "@/common/type/QueryFilters.ts";
import filterEmptyAttributes from "@/common/utility/filterEmptyAttributes.ts";
import MovieRepository from "@/pages/movies/repositories/MovieRepository.ts";
import throwResponseError from "@/common/utility/errors/throwResponseError.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {PaginatedMovies} from "@/pages/movies/schema/model/pagination/MoviePaginationSchema.ts";

/**
 * Parameters for fetching paginated movie data.
 *
 * @property page - The current page number to fetch.
 * @property perPage - The number of items to retrieve per page.
 * @property filters - Optional filter parameters to refine the query. Empty values are stripped.
 * @property populate - Whether to populate related documents (e.g., genres, cast).
 */
type FetchParams = {
    /** The current page number (starts from 1) */
    page: number;
    /** Number of items to retrieve per page */
    perPage: number;
    /** Optional filters to apply to the query */
    filters?: QueryFilters;
    /** Whether to populate related fields in the response */
    populate?: boolean;
}

/**
 * React Query hook for fetching a paginated list of movies with optional filters and population.
 *
 * This hook uses `@tanstack/react-query`'s `useQuery` to fetch paginated movie data from the backend.
 * It supports filtering, population of related data, and automatic query key memoization.
 *
 * @param params - Parameters for fetching movies.
 * @param params.page - The current page number (starting from 1).
 * @param params.perPage - Number of movies to retrieve per page.
 * @param params.filters - Optional object of filters to apply to the query (e.g., by title, genre).
 * @param params.populate - Whether to populate related fields (e.g., cast, director).
 *
 * @returns A `UseQueryResult` object containing the paginated movie data and React Query state.
 *
 * @example
 * ```ts
 * const { data, isLoading, error } = useFetchPaginatedMovies({
 *   page: 1,
 *   perPage: 10,
 *   filters: { title: "Matrix" },
 *   populate: true,
 * });
 * ```
 */
export const useFetchPaginatedMovies = (params: FetchParams): UseQueryResult<PaginatedMovies> => {
    const {page, perPage, filters = {}, populate = false} = params;
    const filteredQueries = filterEmptyAttributes(filters);

    const queryKey = [
        "fetch_paginated_movies",
        {page, perPage, populate, filters: filteredQueries},
    ];

    const action = async () => {
        const {response, result} = await MovieRepository.paginated({
            populate,
            filters: {page, perPage, filteredQueries}
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