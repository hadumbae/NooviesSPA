import GenreRepository from "@/pages/genres/repositories/GenreRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {FetchByIDParams} from "@/common/type/query/FetchByIDParams.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

/**
 * React Query hook for fetching a single genre by its ID.
 *
 * This hook:
 * - Calls `GenreRepository.get()` to retrieve the genre.
 * - Uses `useQueryFnHandler` to wrap the API call with standardized error handling.
 * - Integrates with React Query for caching, background refetching, and status tracking.
 *
 * @param {FetchByIDParams} params - Parameters for fetching the genre.
 * @param {string} params._id - The unique identifier of the genre.
 * @param {boolean} [params.populate=false] - Whether to populate related fields.
 * @param {boolean} [params.virtuals=false] - Whether to include virtual fields.
 *
 * @returns {UseQueryResult<unknown, HttpResponseError>} A React Query result object containing:
 * - `data` — The fetched genre data (if successful).
 * - `isLoading`, `isError`, `isSuccess` — Query status flags.
 * - `error` — A `HttpResponseError` instance if the request fails.
 *
 * @example
 * ```tsx
 * const { data: genre, isLoading, isError, error } = useFetchGenre({ _id: "12345" });
 *
 * if (isLoading) return <p>Loading...</p>;
 * if (isError) return <p>{error.message}</p>;
 *
 * return <div>{genre?.name}</div>;
 * ```
 */
export default function useFetchGenre(params: FetchByIDParams): UseQueryResult<unknown, HttpResponseError> {
    const {_id, populate = false, virtuals = false} = params;

    const queryKey = ["fetch_single_genre", {_id, populate, virtuals}];

    const fetchGenre = useQueryFnHandler({
        action: () => GenreRepository.get({_id, populate, virtuals}),
        errorMessage: "Failed to fetch the genre data. Please try again.",
    });

    return useQuery({
        queryKey,
        queryFn: fetchGenre,
    });
}