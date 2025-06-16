import TheatreRepository from "@/pages/theatres/repositories/TheatreRepository.ts";
import {useQuery} from "@tanstack/react-query";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {Theatre} from "@/pages/theatres/schema/TheatreSchema.ts";
import {FetchByIDParams} from "@/common/type/query/FetchByIDParams.ts";

/**
 * React Query hook to fetch a single theatre by its ObjectId.
 *
 * Retrieves detailed theatre data from the backend, optionally
 * populating referenced fields (such as rooms or address).
 *
 * @param _id - The ObjectId of the theatre to fetch
 * @param populate - Whether to populate related fields (optional, defaults to `false`)
 *
 * @returns A React Query result object containing the theatre data, loading status, and error state.
 *
 * @example
 * ```ts
 * const { data, isLoading, error } = useFetchTheatre({ _id: someId, populate: true });
 * ```
 */
export default function useFetchTheatre({_id, populate = false}: FetchByIDParams) {
    const queryKey = ["fetch_single_theatre", {_id, populate}];

    const action = useQueryFnHandler<Theatre>({
        action: () => TheatreRepository.get({_id, populate}),
        errorMessage: "Failed to fetch theatre data. Please try again.",
    });

    return useQuery({
        queryKey,
        queryFn: action,
    });
}