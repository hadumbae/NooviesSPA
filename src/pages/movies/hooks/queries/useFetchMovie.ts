import MovieRepository from "@/pages/movies/repositories/MovieRepository.ts";
import {useQuery} from "@tanstack/react-query";
import {FetchByIDParams} from "@/common/type/query/FetchByIDParams.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";

/**
 * React Query hook to fetch a single movie by its ID.
 *
 * This hook fetches movie data from the backend using the specified ObjectId.
 * It supports optional population of referenced fields.
 *
 * @param params - Parameters for fetching the movie
 * @param params._id - The ObjectId of the movie to fetch
 * @param params.populate - Whether to populate referenced fields (default: `false`)
 * @param params.virtuals - Whether to include virtual fields in the response (default: `false`)
 *
 * @returns A React Query result object containing the movie data, loading status, and error state.
 *
 * @example
 * ```ts
 * const { data, isLoading, error } = useFetchMovie({ _id: someId, populate: true, virtuals: true });
 * ```
 */
export default function useFetchMovie(params: FetchByIDParams) {
    const {_id, populate = false, virtuals = false} = params;

    const queryKey = ["fetch_single_movie", {_id, populate, virtuals}];

    const fetchMovie = useQueryFnHandler({
        action: () => MovieRepository.get({_id, populate}),
        errorMessage: "Failed to fetch movie data. Please try again."
    });

    return useQuery({
        queryKey,
        queryFn: fetchMovie
    });
}