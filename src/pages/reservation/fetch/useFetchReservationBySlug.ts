/**
 * @file useFetchReservationBySlug.ts
 *
 * React Query hook for fetching a single reservation by slug.
 *
 * Responsibilities:
 * - Wrap repository call with standardized error handling
 * - Provide stable query key scoping
 * - Apply default query options
 *
 * @remarks
 * Query key structure:
 * ["reservations", "slug", { slug, ...config }]
 *
 * Cache is scoped by:
 * - slug
 * - request config (e.g. headers, auth overrides)
 */

import { RequestOptions } from "@/common/type/request/RequestOptions.ts";
import { UseQueryOptions } from "@/common/type/query/UseQueryOptions.ts";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import { ReservationRepository } from "@/pages/reservation/repositories/ReservationRepository.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

type FetchParams = {
    /** Reservation slug identifier */
    slug: string;

    /** Optional request configuration (limit intentionally excluded) */
    config?: Omit<RequestOptions, "limit">;

    /** Optional React Query configuration overrides */
    options?: UseQueryOptions<unknown>;
};

/**
 * Fetch a reservation by slug.
 *
 * @param params - Hook configuration
 * @returns React Query result containing reservation data or HttpResponseError
 */
export function useFetchReservationBySlug(
    { slug, options, config }: FetchParams
): UseQueryResult<unknown, HttpResponseError> {
    const fetchReservation = useQueryFnHandler({
        action: () => ReservationRepository.getBySlug({ slug, config }),
        errorMessage: "Failed to fetch reservation.",
    });

    return useQuery({
        queryKey: ["reservations", "slug", { slug, ...config }],
        queryFn: fetchReservation,
        ...useQueryOptionDefaults(options),
    });
}
