/**
 * @file useFetchMovie.ts
 *
 * React Query hook for fetching a single movie by ID.
 * Provides a typed, standardized interface for retrieving movie data
 * with consistent error handling and shared query defaults.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {IDQueryConfig} from "@/common/types";
import {findByID} from "@/domains/movies/_feat/crud";
import {buildQueryFn} from "@/common/features/validate-fetch-data";
import {MovieCRUDQueryKeys} from "@/domains/movies/_feat/crud-hooks/queryKeys.ts";

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
