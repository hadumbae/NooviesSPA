/**
 * @file useFetchSeatBySlug.ts
 *
 * React Query hook for fetching a single seat by its slug.
 * Slug-based counterpart to `useFetchSeat`, providing consistent
 * query keys, error handling, and request configuration.
 */

import SeatRepository from "@/pages/seats/repositories/SeatRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

/**
 * Parameters for {@link useFetchSeatBySlug}.
 */
type FetchParams = {
    /** Human-readable seat identifier. */
    slug: string;

    /** Request configuration (pagination excluded). */
    config?: Omit<RequestOptions, "limit">;

    /** React Query option overrides. */
    options?: UseQueryOptions<unknown>;
};

/**
 * Fetches a single seat by slug.
 *
 * @param params - Seat slug, request config, and query options
 * @returns React Query result with seat data or {@link HttpResponseError}
 *
 * @example
 * ```ts
 * useFetchSeatBySlug({ slug: "balcony-a12" });
 * ```
 */
export default function useFetchSeatBySlug(
    params: FetchParams
): UseQueryResult<unknown, HttpResponseError> {
    const {slug, config, options} = params;

    const fetchSeat = useQueryFnHandler({
        action: () => SeatRepository.getBySlug({slug, config}),
        errorMessage: "Failed to fetch seat data. Please try again.",
    });

    return useQuery({
        queryKey: ["fetch_seat_by_slug", {slug, ...config}],
        queryFn: fetchSeat,
        ...useQueryOptionDefaults(options),
    });
}
