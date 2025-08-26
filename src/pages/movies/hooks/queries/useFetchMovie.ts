import MovieRepository from "@/pages/movies/repositories/MovieRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {FetchByIDParams} from "@/common/type/query/FetchByIDParams.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

/**
 * Custom hook to fetch a single movie by its ID.
 *
 * This hook leverages React Query's `useQuery` to fetch movie data
 * from the backend using the `MovieRepository`. It also integrates
 * error handling via `useQueryFnHandler`.
 *
 * @param params - Object containing parameters to fetch the movie.
 * @param params._id - The unique identifier of the movie to fetch.
 * @param params.populate - Optional. Whether to populate related entities (default: false).
 * @param params.virtuals - Optional. Whether to include virtual fields (default: false).
 *
 * @returns A React Query `UseQueryResult` containing either the fetched movie
 * data or an `HttpResponseError` if the fetch fails.
 *
 * @example
 * ```ts
 * const { data, error, isLoading } = useFetchMovie({ _id: "12345", populate: true });
 * if (isLoading) return <Spinner />;
 * if (error) return <div>{error.message}</div>;
 * return <MovieDetails movie={data} />;
 * ```
 */
export default function useFetchMovie(params: FetchByIDParams): UseQueryResult<unknown, HttpResponseError> {
    const {_id, populate = false, virtuals = false} = params;

    const queryKey = ["fetch_single_movie", {_id, populate, virtuals}];

    const fetchMovie = useQueryFnHandler({
        action: () => MovieRepository.get({_id, populate, virtuals}),
        errorMessage: "Failed to fetch movie data. Please try again."
    });

    return useQuery({
        queryKey,
        queryFn: fetchMovie,
        staleTime: 1000 * 60,
        placeholderData: (previousData) => previousData,
    });
}