import QueryFilters from "@/common/type/QueryFilters.ts";
import useFetchValidatedDataWithRedirect from "@/common/hooks/validation/useFetchValidatedDataWithRedirect.ts";
import MovieRepository from "@/pages/movies/repositories/MovieRepository.ts";
import {UseQueryResult} from "@tanstack/react-query";
import {MovieArray, MovieArraySchema} from "@/pages/movies/schema/MovieArraySchema.ts";

/**
 * Custom hook to fetch all movies from the API with optional filters.
 *
 * This hook integrates with a schema-based data fetching system, ensuring
 * the response matches the expected structure defined by `MovieArraySchema`.
 * It returns the fetched data, loading state, error state, and other query-related utilities.
 *
 * @function useFetchAllMovies
 *
 * @param {object} [params] - Optional parameters for fetching movies.
 * @param {QueryFilters} [params.filters] - Optional filters to apply to the movie query.
 *
 * @returns {UseQueryResult<MovieArray>} - Query result object containing the fetched movies,
 * loading status, error details, and other utilities from the TanStack Query library.
 */
export default function useFetchAllMovies(params?: {filters?: QueryFilters}): UseQueryResult<MovieArray> {
    const {filters = {}} = params || {};

    const queryKey = ["fetch_all_movies", {filters}];
    const schema = MovieArraySchema;
    const action = () => MovieRepository.getAll({filters});

    return useFetchValidatedDataWithRedirect<typeof schema, MovieArray>({schema, action, queryKey});
}