/**
 * @fileoverview Hook for fetching seat collections based on filters with schema validation and standardized query options.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {SeatQueryOptions} from "@/domains/seats/_feat/handle-query-options/SeatQueryOptions.ts";
import {ListQueryConfig} from "@/common/types";
import {buildQueryFn} from "@/common/features/validate-fetch-data";
import {query} from "@/domains/seats/_feat/crud";
import {SeatCRUDQueryKeys} from "@/domains/seats/_feat/crud-hooks/queryKeys.ts";

/** Props for the useFetchSeats hook. */
type FetchParams<TData = unknown> = ListQueryConfig<TData, SeatQueryOptions>;

/**
 * Retrieves a list of seat entities matching the provided query filters and validates the response.
 */
export function useFetchSeats<TData = unknown>(
    {schema, queries, config, options}: FetchParams<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchSeats = buildQueryFn<TData>({
        action: () => query({queries, config}),
        schema,
    });

    return useQuery({
        queryKey: SeatCRUDQueryKeys.query({...queries, ...config}),
        queryFn: fetchSeats,
        ...useQueryOptionDefaults(options),
    });
}