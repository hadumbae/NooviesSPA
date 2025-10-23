import { FetchByIDParams } from "@/common/type/query/FetchByIDParams.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import RoleTypeRepository from "@/pages/roletype/repositories/RoleTypeRepository.ts";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { UseQueryOptions } from "@/common/type/query/UseQueryOptions.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

type FetchParams<TData = unknown> = FetchByIDParams & UseQueryOptions<TData>;

/**
 * Fetch a single {@link RoleType} by its unique ID using React Query.
 *
 * @template TData - The expected type of the returned role type.
 *
 * @param params - Parameters for fetching a role type by ID.
 * @param params._id - {@link FetchByIDParams._id} The unique identifier of the role type.
 * @param params.populate - {@link FetchByIDParams.populate} Optional. Whether to populate referenced documents.
 * @param params.virtuals - {@link FetchByIDParams.virtuals} Optional. Whether to include virtual properties.
 * @param params.enabled - {@link UseQueryOptions.enabled} Optional. Whether the query should automatically run.
 * @param params.staleTime - {@link UseQueryOptions.staleTime} Optional. Duration in milliseconds before the query is considered stale.
 * @param params.initialData - {@link UseQueryOptions.initialData} Optional. Initial data for the query before fetching.
 * @param params.placeholderData - {@link UseQueryOptions.placeholderData} Optional. Placeholder data returned while the query is fetching.
 *
 * @returns A {@link UseQueryResult} containing:
 *  - `data` — The fetched {@link RoleType} (or placeholder/initial data)
 *  - `error` — Any {@link HttpResponseError} from the fetch
 *  - `isLoading` / `isFetching` — Query state flags
 *
 * @example
 * ```ts
 * const { data, isLoading, error } = useFetchRoleType({
 *   _id: "role_123",
 *   populate: true,
 *   virtuals: false
 * });
 *
 * if (data) {
 *   console.log("Fetched RoleType:", data);
 * }
 * ```
 *
 * @remarks
 * - Uses {@link useQueryFnHandler} to handle fetch errors with a consistent message.
 * - Automatically caches the fetched role type using React Query.
 * - Query is considered fresh for 60 seconds (`staleTime: 1000 * 60`).
 */
export default function useFetchRoleType<TData = unknown>(
    params: FetchParams<TData>
): UseQueryResult<TData, HttpResponseError> {
    const {
        _id,
        populate,
        virtuals,
        enabled = true,
        staleTime = 1000 * 60,
        placeholderData = (previousData: TData | undefined) => previousData,
        initialData,
    } = params;

    const queryKey = ["fetch_single_role_type_by_id", params];

    const fetchRoleType = useQueryFnHandler({
        action: () => RoleTypeRepository.get({ _id, populate, virtuals }),
        errorMessage: "Failed to fetch role type. Please try again.",
    });

    return useQuery({
        queryKey,
        queryFn: fetchRoleType,
        staleTime,
        placeholderData,
        initialData,
        enabled,
    });
}
