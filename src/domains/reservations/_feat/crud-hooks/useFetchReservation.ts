/**
 * @fileoverview React Query hook for fetching a single reservation by its unique identifier.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {IDQueryConfig} from "@/common/types";
import {findByID} from "@/domains/reservations/_feat/crud";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {ReservationCRUDQueryKeys} from "@/domains/reservations/_feat/crud-hooks/queryKeys.ts";

/**
 * Fetches a reservation by its ID and validates the response against a schema.
 */
export function useFetchReservation<TData = unknown>(
    {_id, options, config, schema}: IDQueryConfig<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchReservation = buildQueryFn<TData>({
        action: () => findByID({_id, config}),
        schema,
    });

    return useQuery({
        queryKey: ReservationCRUDQueryKeys._id({_id, ...config}),
        queryFn: fetchReservation,
        ...useQueryOptionDefaults(options),
    });
}
