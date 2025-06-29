import TheatreRepository from "@/pages/theatres/repositories/TheatreRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {FetchByIDParams} from "@/common/type/query/FetchByIDParams.ts";

/**
 * React Query hook for fetching a single theatre by its ID.
 *
 * @template TData - The expected shape of the returned theatre data.
 *
 * @param {_id, ...requestOptions} - Parameters used to fetch the theatre.
 *  - `_id`: The ID of the theatre to fetch.
 *  - `requestOptions`: Additional options forwarded to the repository method (e.g. headers or context).
 *
 * @returns A {@link UseQueryResult} object containing the theatre data, loading state, and error state.
 *
 * @example
 * ```ts
 * const { data, isLoading, error } = useFetchTheatre<TheatreDetails>({ _id: "abc123" });
 * ```
 */
export default function useFetchTheatre<TData>(
    {_id, ...requestOptions}: FetchByIDParams
): UseQueryResult<TData> {
    const queryKey = ["fetch_single_theatre", {_id, ...requestOptions}];

    const action = useQueryFnHandler<TData>({
        action: () => TheatreRepository.get({_id, ...requestOptions}),
        errorMessage: "Failed to fetch theatre data. Please try again.",
    });

    return useQuery({
        queryKey,
        queryFn: action,
    });
}