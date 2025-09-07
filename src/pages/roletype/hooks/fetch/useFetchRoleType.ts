import {FetchByIDParams} from "@/common/type/query/FetchByIDParams.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import RoleTypeRepository from "@/pages/roletype/repositories/RoleTypeRepository.ts";
import {useQuery} from "@tanstack/react-query";

/**
 * Custom React hook to fetch a single `RoleType` by its unique identifier.
 *
 * This hook uses React Query internally and provides:
 * - Caching and automatic re-fetching
 * - Placeholder data support
 * - Error handling via {@link useQueryFnHandler}
 *
 * @param params - Parameters for fetching a role type by ID.
 *   Includes:
 *   - `_id`: The unique identifier of the role type.
 *   - `populate` (optional): Whether to populate referenced documents.
 *   - `virtuals` (optional): Whether to include virtual properties in the result.
 *
 * @returns A React Query `useQuery` result object containing:
 *  - `data` - The fetched role type (or placeholder/previous data)
 *  - `error` - Any fetch errors
 *  - `isLoading` / `isFetching` - Query state flags
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
 * - The hook automatically caches the fetched role type using React Query.
 * - If the fetch fails, a toast or error handling mechanism can be triggered
 *   via `useQueryFnHandler`.
 * - The query is considered fresh for 1 minute (`staleTime: 60_000`).
 */
export default function useFetchRoleType(params: FetchByIDParams) {
    const {_id, populate, virtuals} = params;

    const queryKey = ["fetch_single_role_type_by_id", params];

    const fetchRoleType = useQueryFnHandler({
        action: () => RoleTypeRepository.get({_id, populate, virtuals}),
        errorMessage: "Failed to fetch role type. Please try again.",
    });

    return useQuery({
        queryKey,
        queryFn: fetchRoleType,
        staleTime: 1000 * 60,
        placeholderData: (previousData) => previousData,
    });
}