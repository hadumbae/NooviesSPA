/**
 * @fileoverview React Query hook for fetching a single reservation by its slug.
 */

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {SlugQueryConfig} from "@/common/types";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {ReservationCRUDQueryKeys} from "@/domains/reservation/_feat/crud-hooks/queryKeys.ts";
import {findBySlug} from "@/domains/reservation/_feat/crud";

/**
 * Fetches a reservation by slug and validates the response against a schema.
 */
export function useFetchReservationBySlug<TData = unknown>(
    { slug, options, config, schema }: SlugQueryConfig<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchReservation = buildQueryFn<TData>({
        action: () => findBySlug({ slug, config }),
        schema
    });

    return useQuery({
        queryKey: ReservationCRUDQueryKeys.slug({ slug, ...config }),
        queryFn: fetchReservation,
        ...useQueryOptionDefaults(options),
    });
}
