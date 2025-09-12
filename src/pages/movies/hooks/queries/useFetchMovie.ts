import MovieRepository from "@/pages/movies/repositories/MovieRepository.ts";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { FetchByIDParams } from "@/common/type/query/FetchByIDParams.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import { UseQueryOptions } from "@/common/type/UseQueryOptions.ts";

/**
 * Parameters for fetching a single movie.
 *
 * Combines the base fetch parameters with query options.
 *
 * @template TData The expected type of the data returned by the query.
 */
export type FetchParams<TData> = FetchByIDParams & UseQueryOptions<TData>;

/**
 * Custom hook to fetch a single movie by its ID.
 *
 * @template TData The expected type of the movie data returned by the query.
 *
 * @param params - Object containing parameters to fetch the movie.
 * @param params._id - The unique identifier of the movie to fetch.
 * @param params.populate - Optional. Whether to populate related entities (default: false).
 * @param params.virtuals - Optional. Whether to include virtual fields (default: false).
 * @param params.staleTime - See {@link UseQueryOptions#staleTime}.
 * @param params.initialData - See {@link UseQueryOptions#initialData}.
 * @param params.placeholderData - See {@link UseQueryOptions#placeholderData}.
 *
 * @returns A {@link UseQueryResult} containing the movie data or an {@link HttpResponseError}.
 *
 * @example
 * ```ts
 * const { data, error, isLoading } = useFetchMovie<Movie>({
 *   _id: "12345",
 *   populate: true
 * });
 * if (isLoading) return <Spinner />;
 * if (error) return <div>{error.message}</div>;
 * return <MovieDetails movie={data} />;
 * ```
 */
export default function useFetchMovie<TData = unknown>(
    params: FetchParams<TData>
): UseQueryResult<TData, HttpResponseError> {
    const {
        _id,
        populate = false,
        virtuals = false,
        staleTime = 1000 * 60,
        initialData,
        placeholderData = (previousData: TData | undefined) => previousData,
    } = params;

    const queryKey = ["fetch_single_movie", { _id, populate, virtuals }];

    const fetchMovie = useQueryFnHandler({
        action: () => MovieRepository.get({ _id, populate, virtuals }),
        errorMessage: "Failed to fetch movie data. Please try again."
    });

    return useQuery({
        queryKey,
        queryFn: fetchMovie,
        staleTime,
        initialData,
        placeholderData,
    });
}
