import QueryFilters from "@/common/type/QueryFilters.ts";
import MovieRepository from "@/pages/movies/repositories/MovieRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {MovieArray} from "@/pages/movies/schema/model/MovieArraySchema.ts";

/**
 * Optional parameters for fetching a list of movies.
 */
type FetchParams = {
    /**
     * Filters to apply to the movie query. Can include arbitrary fields based on backend support.
     */
    filters?: QueryFilters;

    /**
     * Whether to populate reference fields with related documents (e.g., genres, cast).
     * Defaults to `false`.
     */
    populate?: boolean;

    /**
     * Whether to include virtual fields defined on the movie model.
     * Defaults to `false`.
     */
    virtuals?: boolean;
};

/**
 * React hook to fetch all movies using React Query.
 *
 * Wraps the `MovieRepository.getAll` method and provides caching, error handling,
 * and state management via `useQuery`.
 *
 * @param params - Optional fetch parameters including filters, population, and virtual fields.
 * @returns A `UseQueryResult` containing the movie array and query status.
 *
 * @example
 * ```ts
 * const { data: movies, isLoading, error } = useFetchAllMovies({
 *   filters: { genre: "sci-fi" },
 *   populate: true,
 * });
 * ```
 */
export default function useFetchAllMovies(params?: FetchParams): UseQueryResult<MovieArray> {
    const {filters = {}, populate = false, virtuals = false} = params || {};

    const queryKey = ["fetch_all_movies", {filters, populate, virtuals}];
    const fetchMovies = async () => {
        const {result, response} = await MovieRepository.getAll({populate, virtuals, filters});
        if (!response.ok) throw new HttpResponseError({response, message: "Failed to fetch movies."});
        return result;
    }

    return useQuery({
        queryKey,
        queryFn: fetchMovies,
    });
}