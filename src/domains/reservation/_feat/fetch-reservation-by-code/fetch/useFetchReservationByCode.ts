/**
 * @fileoverview TanStack Query hook for administrative reservation lookups by unique code.
 */

import {ReservationUniqueCode} from "@/domains/reservation/schema/model";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {
    getFetchByCode
} from "@/domains/reservation/_feat/fetch-reservation-by-code/repositories/repository.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {FetchByCodeQueryKeys} from "@/domains/reservation/_feat/admin-view-data";

/** Props for the useFetchReservationByCode hook. */
type FetchCodeParams = {
    code: ReservationUniqueCode;
    options?: FetchQueryOptions<unknown>;
}

/**
 * Fetches a single reservation using the administrative lookup repository.
 */
export function useFetchReservationByCode(
    {code, options}: FetchCodeParams
): UseQueryResult<unknown, HttpResponseError> {
    const fetchReservation = useQueryFnHandler({
        action: () => getFetchByCode({code}),
        errorMessage: "Failed to fetch reservation by code.",
    });

    return useQuery({
        queryKey: FetchByCodeQueryKeys.fetchByCode({code}),
        queryFn: fetchReservation,
        ...useQueryOptionDefaults(options),
    });
}