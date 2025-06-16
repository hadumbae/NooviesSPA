import ShowingRepository from "@/pages/showings/repositories/ShowingRepository.ts";
import {useQuery} from "@tanstack/react-query";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {FetchByIDParams} from "@/common/type/query/FetchByIDParams.ts";

/**
 * React Query hook to fetch a single showing by its ID.
 *
 * This hook retrieves detailed showing data from the backend,
 * optionally with populated references (e.g., related models like film or room).
 *
 * @param params - Parameters for fetching the showing
 * @param params._id - The ObjectId of the showing to fetch
 * @param params.populate - Whether to populate referenced fields (default: `false`)
 *
 * @returns A React Query result object containing the showing data, loading and error states, etc.
 *
 * @example
 * ```ts
 * const { data, isLoading, error } = useFetchShowing({ _id: someId, populate: true });
 * ```
 */
export default function useFetchShowing(params: FetchByIDParams) {
    const {_id, populate = false} = params;

    const queryKey = ["fetch_single_showing", {_id, populate}];

    const fetchShowing = useQueryFnHandler({
       action: () => ShowingRepository.get({_id, populate}),
       errorMessage: "Failed to fetch showing data. Please try again.",
    });

    return useQuery({
        queryKey,
        queryFn: fetchShowing,
    });
}