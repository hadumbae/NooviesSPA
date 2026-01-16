/**
 * @file useFetchRoleType.ts
 *
 * React Query hook for fetching a single `RoleType` by its unique ID.
 *
 * Encapsulates repository access, error handling, query defaults,
 * and cache key construction.
 */

import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import RoleTypeRepository from "@/pages/roletype/repositories/RoleTypeRepository.ts";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { UseQueryOptions } from "@/common/type/query/UseQueryOptions.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import { ObjectId } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import { RequestOptions } from "@/common/type/request/RequestOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

/**
 * Parameters for fetching a single role type by ID.
 */
type FetchParams = {
    /** Unique role type identifier */
    _id: ObjectId;

    /** Optional request configuration (populate, virtuals, etc.) */
    config?: Omit<RequestOptions, "limit">;

    /** Optional React Query configuration */
    options?: UseQueryOptions<unknown>;
};

/**
 * Fetches a single `RoleType` by its unique ID using React Query.
 *
 * @param params - Fetch parameters
 *
 * @returns A {@link UseQueryResult} containing:
 * - `data` — The fetched role type
 * - `error` — {@link HttpResponseError} if the request fails
 * - Query state flags (`isLoading`, `isFetching`, etc.)
 *
 * @example
 * ```ts
 * const { data } = useFetchRoleType({
 *   _id: "role_123",
 *   config: { populate: true }
 * });
 * ```
 *
 * @remarks
 * - Uses {@link useQueryFnHandler} for consistent error handling
 * - Query options are normalized via {@link useQueryOptionDefaults}
 */
export default function useFetchRoleType(
    {_id, config, options}: FetchParams
): UseQueryResult<unknown, HttpResponseError> {
    const fetchRoleType = useQueryFnHandler({
        action: () => RoleTypeRepository.get({ _id, config }),
        errorMessage: "Failed to fetch role type. Please try again.",
    });

    return useQuery({
        queryKey: ["roleTypes", "_id", {_id, ...config}],
        queryFn: fetchRoleType,
        ...useQueryOptionDefaults(options),
    });
}
