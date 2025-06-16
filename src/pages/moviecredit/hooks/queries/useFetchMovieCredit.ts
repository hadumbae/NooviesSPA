import MovieCreditRepository from "@/pages/moviecredit/repositories/MovieCreditRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {FetchByIDParams} from "@/common/type/query/FetchByIDParams.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";

/**
 * React Query hook to fetch a single movie credit by its ID.
 *
 * This hook queries the backend for a specific movie credit document using the provided ObjectId.
 * It supports optional population of related fields (e.g., actor, role, or movie data).
 *
 * @param params - Parameters for fetching the movie credit
 * @param params._id - The ObjectId of the movie credit to fetch
 * @param params.populate - Whether to populate referenced fields (optional, defaults to `false`)
 *
 * @returns A React Query result object containing the movie credit data,
 *          along with loading, error, and refetch metadata.
 *
 * @example
 * ```ts
 * const { data, isLoading, error } = useFetchMovieCredit({ _id: someId, populate: true });
 * ```
 */
export default function useFetchMovieCredit(params: FetchByIDParams): UseQueryResult {
    const {_id, populate = false} = params;

    const queryKey = ["fetch_movie_credit", {_id, populate}];

    const fetchMovieCredit = useQueryFnHandler({
        action: () => MovieCreditRepository.get({_id, populate}),
        errorMessage: "Failed to fetch movie credit data. Please try again."
    });

    return useQuery({
        queryKey,
        queryFn: fetchMovieCredit,
    });
}