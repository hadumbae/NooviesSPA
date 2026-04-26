/**
 * @fileoverview Hook for fetching a single seat by ID with schema validation and standardized query options.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {QueryConfig} from "@/common/types";
import {buildQueryFn} from "@/common/features/validate-fetch-data";
import {findByID} from "@/domains/seats/_feat/crud";
import {SeatCRUDQueryKeys} from "@/domains/seats/_feat/crud-hooks/queryKeys.ts";

/** Parameters for the useFetchSeat hook. */
type FetchParams<TData = unknown> = QueryConfig<TData> & {
    _id: ObjectId;
};

/**
 * Retrieves a single seat entity by its unique identifier and validates the response against a Zod schema.
 */
export function useFetchSeat<TData = unknown>(
    {schema, _id, config, options}: FetchParams<TData>
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