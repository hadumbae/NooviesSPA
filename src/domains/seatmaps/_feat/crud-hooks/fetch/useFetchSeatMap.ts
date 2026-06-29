/**
 * @fileoverview Hook for fetching and validating a single seat map by its identifier.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {IDQueryConfig} from "@/common/types";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {findByID} from "@/domains/seatmaps/_feat/crud";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {SeatMapCRUDQueryKeys} from "@/domains/seatmaps/_feat/crud-hooks";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

/** Fetches a seat map document and validates it against a provided schema. */
export function useFetchSeatMap<TData = unknown>(
    {_id, options, config, schema}: IDQueryConfig<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchSeatMap = buildQueryFn<TData>({
        action: () => findByID({_id, config}),
        schema,
    });

    return useQuery({
        queryKey: SeatMapCRUDQueryKeys._id({_id, ...config}),
        queryFn: fetchSeatMap,
        ...useQueryOptionDefaults(options),
    });
}
