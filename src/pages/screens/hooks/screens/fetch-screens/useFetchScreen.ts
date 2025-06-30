import ScreenRepository from "@/pages/screens/repositories/ScreenRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {FetchByIDParams} from "@/common/type/query/FetchByIDParams.ts";

/**
 * React Query hook for fetching a single screen by its ID.
 *
 * @template TData - The expected shape of the returned screen data.
 *
 * @param _id - The ID of the screen to fetch.
 * @param fetchOptions - Additional options forwarded to the repository method (e.g. headers or query params).
 *
 * @returns A {@link UseQueryResult} containing the screen data, loading state, and error state.
 *
 * @example
 * ```ts
 * const { data, isLoading, error } = useFetchScreen<ScreenDetails>({ _id: "xyz789" });
 * ```
 */
export default function useFetchScreen<TData>(
    {_id, ...fetchOptions}: FetchByIDParams
): UseQueryResult<TData> {
    const queryKey = ["fetch_single_screen", {_id, ...fetchOptions}];

    const fetchScreen = useQueryFnHandler<TData>({
        action: () => ScreenRepository.get({_id, ...fetchOptions}),
        errorMessage: "Failed to fetch screen data. Please try again.",
    });

    return useQuery({
        queryKey,
        queryFn: fetchScreen,
    });
}