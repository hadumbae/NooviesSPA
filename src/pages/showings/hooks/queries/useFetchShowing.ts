import ShowingRepository from "@/pages/showings/repositories/ShowingRepository.ts";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import { FetchByIDParams } from "@/common/type/query/FetchByIDParams.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import { UseQueryOptions } from "@/common/type/UseQueryOptions.ts";

/**
 * Parameters for {@link useFetchShowing} hook.
 *
 * @template TData - Optional type override for the query data.
 */
type FetchParams<TData = unknown> = FetchByIDParams & UseQueryOptions<TData>;

/**
 * React hook to fetch a single showing by ID using React Query.
 *
 * @template TData - Optional type of the returned data.
 *
 * @param {FetchParams<TData>} params - Parameters to configure the query.
 * @param {string} params._id - The ID of the showing to fetch.
 * @param {boolean} [params.populate=false] - Whether to populate relational fields.
 * @param {boolean} [params.enabled=true] - Controls whether the query is active.
 * @param {number} [params.staleTime=60000] - Time in ms before the query is considered stale.
 * @param {(data: TData | undefined) => TData | undefined} [params.placeholderData] - Placeholder data function while fetching.
 * @param {TData} [params.initialData] - Initial query data.
 *
 * @returns {UseQueryResult<unknown, HttpResponseError>} React Query result object.
 *
 * @remarks
 * This hook internally wraps `ShowingRepository.get` with `useQueryFnHandler`
 * to provide consistent error messaging. It supports React Query options such as
 * `staleTime`, `enabled`, `placeholderData`, and `initialData`.
 *
 * @example
 * ```ts
 * const { data, isLoading, error } = useFetchShowing({ _id: "showing123", populate: true });
 * ```
 */
export default function useFetchShowing<TData = unknown>(
    params: FetchParams<TData>
): UseQueryResult<unknown, HttpResponseError> {
    const {
        _id,
        populate = false,
        enabled = true,
        staleTime = 1000 * 60,
        placeholderData = (data: TData | undefined) => data,
        initialData,
    } = params;

    const queryKey = ["fetch_single_showing", { _id, populate }];

    const fetchShowing = useQueryFnHandler({
        action: () => ShowingRepository.get({ _id, populate }),
        errorMessage: "Failed to fetch showing data. Please try again.",
    });

    return useQuery({
        queryKey,
        queryFn: fetchShowing,
        enabled,
        staleTime,
        placeholderData,
        initialData,
    });
}
