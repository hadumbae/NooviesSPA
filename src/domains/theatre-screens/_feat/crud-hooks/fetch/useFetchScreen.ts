/**
 * @fileoverview React Query hook for fetching a single theatre screen by its unique identifier.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";

import {findByID} from "@/domains/theatre-screens/_feat/crud";
import {TheatreScreenCRUDQueryKeys} from "@/domains/theatre-screens/_feat/crud-hooks/keys";
import {IDQueryConfig} from "@/common/types";

/**
 * Fetches and validates a single theatre screen record by ID.
 */
export function useFetchScreen<TData = unknown>(
    {schema, _id, config, options}: IDQueryConfig<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchScreen = buildQueryFn<TData>({
        action: () => findByID({_id, config}),
        schema,
    });

    return useQuery({
        queryKey: TheatreScreenCRUDQueryKeys._id({_id, ...config}),
        queryFn: fetchScreen,
        ...useQueryOptionDefaults(options),
    });
}