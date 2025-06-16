import GenreRepository from "@/pages/genres/repositories/GenreRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {FetchByIDParams} from "@/common/type/query/FetchByIDParams.ts";

/**
 * React Query hook to fetch a single genre by its ID.
 *
 * This hook retrieves genre data from the backend, optionally populating
 * any referenced fields depending on the `populate` flag.
 *
 * @param _id - The ObjectId of the genre to fetch
 * @param populate - Whether to populate referenced fields (optional, defaults to `false`)
 *
 * @returns A React Query result object containing the genre data along with
 *          loading and error states.
 *
 * @example
 * ```ts
 * const { data, isLoading, error } = useFetchGenre({ _id: someId, populate: true });
 * ```
 */
export default function useFetchGenre({_id, populate = false}: FetchByIDParams): UseQueryResult {
    const queryKey = ["fetch_single_genre", {_id, populate}];
    const fetchGenre = useQueryFnHandler({
        action: () => GenreRepository.get({_id, populate}),
        errorMessage: "Failed to fetch the genre data. Please try again.",
    });

    return useQuery({
        queryKey,
        queryFn: fetchGenre,
    });
}