/**
 * @fileoverview Hook for retrieving a specific theatre by its unique identifier.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {useQueryOptionDefaults} from "@/common/_feat/handle-query/useQueryOptionDefaults.ts";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {IDQueryConfig} from "@/common/_types";

import {findByID} from "@/domains/theatres/_feat/crud";
import {TheatreCRUDQueryKeys} from "@/domains/theatres/_feat/crud-hooks/keys";

/** Fetches a single theatre and validates the response against a schema. */
export function useFetchTheatre<TData = unknown>(
    {schema, _id, config, options}: IDQueryConfig<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchTheatre = buildQueryFn<TData>({
        action: () => findByID({_id, config}),
        schema,
    });

    return useQuery({
        queryKey: TheatreCRUDQueryKeys._id({_id, ...config}),
        queryFn: fetchTheatre,
        ...useQueryOptionDefaults(options),
    });
}