/**
 * @fileoverview React Query hook for fetching movie data from the backend.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {MovieQueryOptions} from "@/domains/movies/schema/queries";
import {ListQueryConfig} from "@/common/types";
import {find} from "@/domains/movies/_feat/crud";
import {buildQueryFn} from "@/common/features/validate-fetch-data";
import {MovieCRUDQueryKeys} from "@/domains/movies/_feat/crud-hooks/queryKeys.ts";

/**
 * Fetches a list of movies with support for filtering and validation.
 */
export function useFetchMovies<TData = unknown>(
    {schema, queries, config, options}: ListQueryConfig<TData, MovieQueryOptions>
): UseQueryResult<TData, HttpResponseError> {
    const fetchMovies = buildQueryFn<TData>({
        action: () => find({queries, config}),
        schema,
    });

    return useQuery({
        queryKey: MovieCRUDQueryKeys.find({...queries, ...config}),
        queryFn: fetchMovies,
        ...useQueryOptionDefaults(options),
    });
}
