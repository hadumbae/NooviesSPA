/**
 * @file TanStack Query hook for administrative reservation lookups by unique code.
 * @filename useFetchReservationByCode.ts
 */

import {ReservationUniqueCode} from "@/domains/reservation/schema/model";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {getFetchByCode} from "@/domains/reservation/views/admin/reservation-by-code/FetchByCodeRepository.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

/**
 * Props for the {@link useFetchReservationByCode} hook.
 */
type FetchCodeParams = {
    /** The validated `RES-XXXXX-XXXXX` code string. */
    code: ReservationUniqueCode;
    /** Standard TanStack Query configuration overrides. */
    options?: UseQueryOptions<unknown>;
}

/**
 * Custom hook to fetch a single reservation using the administrative lookup repository.
 * @param `params` - The unique code and optional query configurations.
 * @returns A query result object containing the reservation data, loading states, and {@link HttpResponseError}.
 */
export function useFetchReservationByCode(
    {code, options}: FetchCodeParams
): UseQueryResult<unknown, HttpResponseError> {
    const fetchReservation = useQueryFnHandler({
        action: () => getFetchByCode({code}),
        errorMessage: "Failed to fetch reservation by code.",
    });

    return useQuery({
        queryKey: ["reservations", "fetch", "by-code", "unique", {code}],
        queryFn: fetchReservation,
        ...useQueryOptionDefaults(options),
    });
}