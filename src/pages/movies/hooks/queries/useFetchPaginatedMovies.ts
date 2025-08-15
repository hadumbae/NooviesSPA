import MovieRepository from "@/pages/movies/repositories/MovieRepository.ts";
import throwResponseError from "@/common/utility/errors/throwResponseError.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {RequestOptions} from "@/common/type/repositories/EntityRequestParamTypes.ts";

import {PaginatedMovies} from "@/pages/movies/schema/movie/Movie.types.ts";

/**
 * Parameters for fetching a specific page of movie results.
 *
 * Extends {@link RequestOptions} to include pagination-specific properties.
 */
type FetchParams = RequestOptions & {
    /** The page number to retrieve (1-indexed). */
    page: number;

    /** The number of items to retrieve per page. */
    perPage: number;
}


/**
 * Custom React Query hook to fetch a paginated list of movies.
 *
 * Uses the `MovieRepository.paginated()` method under the hood to retrieve
 * movies based on the provided `page`, `perPage`, and optional flags like
 * `populate` and `virtuals`. The result is cached and managed by React Query.
 *
 * If the response is not OK, it throws a standardized response error using
 * `throwResponseError`.
 *
 * @param params - The parameters for pagination and data shaping.
 * @returns A `UseQueryResult` containing `PaginatedMovies` or error/loading state.
 */
export const useFetchPaginatedMovies = (params: FetchParams): UseQueryResult<PaginatedMovies> => {
    const {page, perPage, populate = false, virtuals = false} = params;

    const queryKey = ["fetch_paginated_movies", {page, perPage, populate, virtuals}] as const;

    const fetchPaginatedMovies = async () => {
        const {response, result} = await MovieRepository.paginated({
            populate,
            virtuals,
            filters: {page, perPage}
        });

        if (!response.ok) {
            const message = "Failed To Fetch Data. Please Try Again.";
            throwResponseError({response, result, message});
        }

        return result;
    }

    return useQuery({
        queryKey,
        queryFn: fetchPaginatedMovies,
    });
}