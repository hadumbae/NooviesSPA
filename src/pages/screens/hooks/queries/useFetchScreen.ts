import ScreenRepository from "@/pages/screens/repositories/ScreenRepository.ts";
import {useQuery} from "@tanstack/react-query";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {FetchByIDParams} from "@/common/type/query/FetchByIDParams.ts";

/**
 * React Query hook to fetch a single screen by its ID.
 *
 * This hook retrieves screen data from the backend using the provided ObjectId,
 * and optionally populates any referenced fields if `populate` is `true`.
 *
 * @param _id - The ObjectId of the screen to fetch
 * @param populate - Whether to populate referenced fields (optional, defaults to `false`)
 *
 * @returns A React Query result object containing the screen data along with loading and error states.
 *
 * @example
 * ```ts
 * const { data, isLoading, error } = useFetchScreen({ _id: someId, populate: true });
 * ```
 */
export default function useFetchScreen({_id, ...fetchOptions}: FetchByIDParams) {
    const queryKey = ["fetch_single_screen", {_id, ...fetchOptions}];

    const fetchScreen = useQueryFnHandler({
        action: () => ScreenRepository.get({_id, ...fetchOptions}),
        errorMessage: "Failed to fetch screen data. Please try again.",
    })

    return useQuery({
        queryKey,
        queryFn: fetchScreen,
    });
}