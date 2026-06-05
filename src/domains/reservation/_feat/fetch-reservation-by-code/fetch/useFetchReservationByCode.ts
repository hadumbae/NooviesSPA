/**
 * @fileoverview TanStack Query hook for administrative reservation lookups by unique code.
 */

import {ReservationUniqueCode} from "@/domains/reservation/schema";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {getFetchByCode} from "@/domains/reservation/_feat/fetch-reservation-by-code/repositories";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {
    FetchByCodeData,
    FetchByCodeDataSchema,
    FetchByCodeQueryKeys
} from "@/domains/reservation/_feat/fetch-reservation-by-code";

/** Props for the useFetchReservationByCode hook. */
type FetchCodeParams = {
    code: ReservationUniqueCode;
    options?: FetchQueryOptions<FetchByCodeData>;
}

/**
 * Fetches a single reservation using the administrative lookup repository.
 */
export function useFetchReservationByCode(
    {code, options}: FetchCodeParams
): UseQueryResult<FetchByCodeData, HttpResponseError> {
    const fetchReservation = buildQueryFn<FetchByCodeData>({
        action: () => getFetchByCode({code}),
        schema: FetchByCodeDataSchema,
    });

    return useQuery({
        queryKey: FetchByCodeQueryKeys.fetchByCode({code}),
        queryFn: fetchReservation,
        ...useQueryOptionDefaults(options),
    });
}