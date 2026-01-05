import {useQuery, UseQueryResult} from "@tanstack/react-query";

import TheatreRepository from "@/pages/theatres/repositories/TheatreRepository.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";

/**
 * Parameters accepted by {@link useFetchTheatre}.
 */
type FetchParams = {
    /**
     * Unique identifier of the theatre to fetch.
     */
    _id: ObjectId;

    /**
     * Optional request-level configuration.
     *
     * @remarks
     * `limit` is omitted because this query targets a single entity.
     */
    config?: Omit<RequestOptions, "limit">;

    /**
     * Optional React Query configuration.
     */
    options?: UseQueryOptions<unknown>;
};

/**
 * React Query hook for fetching a single theatre by ID.
 *
 * Wraps `useQuery` to:
 * - Fetch theatre data via {@link TheatreRepository.get}
 * - Apply standardized error handling
 * - Merge shared React Query defaults
 * - Cache results by theatre ID and request configuration
 *
 * Intended for detail pages, edit forms, and admin views
 * where the theatre ID is the primary identifier.
 *
 * @template TData
 * Expected response payload type.
 *
 * @param params - Theatre ID, request configuration, and query options.
 *
 * @returns A {@link UseQueryResult} containing:
 * - `data` — fetched theatre data
 * - `isLoading` / `isFetching` — loading states
 * - `isError` / `error` — error state
 *
 * @example
 * ```ts
 * const { data, isLoading } = useFetchTheatre({
 *   _id: "66b9d1b8c35f2a0012cd90f0",
 *   config: { populate: true },
 * });
 * ```
 */
export default function useFetchTheatre(
    {_id, config, options}: FetchParams
): UseQueryResult<unknown, HttpResponseError> {
    /**
     * Query function for fetching a single theatre.
     */
    const action = useQueryFnHandler({
        action: () => TheatreRepository.get({_id, config}),
        errorMessage: "Failed to fetch theatre data. Please try again.",
    });

    return useQuery({
        queryKey: ["fetch_theatre_by_id", {_id, ...config}],
        queryFn: action,
        ...useQueryOptionDefaults(options),
    });
}
