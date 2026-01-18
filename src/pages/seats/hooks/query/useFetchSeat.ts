/**
 * @file useFetchSeat.ts
 *
 * React Query hook for fetching a single seat by its unique identifier.
 * Provides a consistent, typed interface with shared query defaults
 * and standardized error handling.
 */

import SeatRepository from "@/pages/seats/repositories/SeatRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

/**
 * Parameters for {@link useFetchSeat}.
 */
type FetchParams = {
    /**
     * Seat identifier.
     */
    _id: ObjectId;

    /**
     * Request-level configuration (excluding pagination limit).
     */
    config?: Omit<RequestOptions, "limit">;

    /**
     * React Query configuration overrides.
     */
    options?: UseQueryOptions<unknown>;
};

/**
 * # useFetchSeat Hook
 *
 * Fetches a single seat entity by ID.
 *
 * Integrates:
 * - **SeatRepository** for API access
 * - **useQueryFnHandler** for consistent error handling
 * - **useQueryOptionDefaults** for shared React Query defaults
 *
 * @param params
 * Seat ID, request configuration, and React Query options.
 *
 * @returns
 * React Query result containing seat data or an {@link HttpResponseError}.
 *
 * @example
 * ```ts
 * const { data, isLoading } = useFetchSeat({
 *   _id: seatId,
 * });
 * ```
 */
export default function useFetchSeat(
    params: FetchParams
): UseQueryResult<unknown, HttpResponseError> {
    const {_id, config, options} = params;

    const fetchSeat = useQueryFnHandler({
        action: () => SeatRepository.get({_id, config}),
        errorMessage: "Failed to fetch seat data. Please try again.",
    });

    return useQuery({
        queryKey: ["seats", "_id", {_id, ...config}],
        queryFn: fetchSeat,
        ...useQueryOptionDefaults(options),
    });
}
