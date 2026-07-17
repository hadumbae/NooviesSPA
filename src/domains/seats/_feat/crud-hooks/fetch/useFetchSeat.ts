/**
 * @fileoverview Hook for fetching a single seat by ID with schema validation and standardized query options.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";
import {useQueryOptionDefaults} from "@/common/_feat/handle-query/useQueryOptionDefaults.ts";
import {IDQueryConfig} from "@/common/_types";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";

import {findByID} from "@/domains/seats/_feat/crud";
import {SeatCRUDQueryKeys} from "@/domains/seats/_feat/crud-hooks/keys";

/**
 * Retrieves a single seat entity by its unique identifier and validates the response against a Zod schema.
 */
export function useFetchSeat<TData = unknown>(
    {schema, _id, config, options}: IDQueryConfig<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchSeat = buildQueryFn<TData>({
        action: () => findByID({_id, config}),
        schema,
    });

    return useQuery({
        queryKey: SeatCRUDQueryKeys._id({_id, ...config}),
        queryFn: fetchSeat,
        ...useQueryOptionDefaults(options),
    });
}