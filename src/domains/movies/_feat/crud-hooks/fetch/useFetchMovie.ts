/**
 * @fileoverview React Query hook for fetching and validating a single movie by its ID.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";
import {useQueryOptionDefaults} from "@/common/_feat/handle-query/useQueryOptionDefaults.ts";
import {IDQueryConfig} from "@/common/_types";
import {findByID} from "@/domains/movies/_feat/crud";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {MovieCRUDQueryKeys} from "@/domains/movies/_feat/crud-hooks/keys";

/** Fetches a movie document and validates it against the provided schema. */
export function useFetchMovie<TData = unknown>(
    {_id, config, options, schema}: IDQueryConfig<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchMovie = buildQueryFn<TData>({
        action: () => findByID({_id, config}),
        schema,
    });

    return useQuery({
        queryKey: MovieCRUDQueryKeys._id({_id, ...config}),
        queryFn: fetchMovie,
        ...useQueryOptionDefaults(options),
    });
}
