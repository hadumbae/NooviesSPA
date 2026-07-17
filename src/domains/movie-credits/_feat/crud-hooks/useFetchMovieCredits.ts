/** @fileoverview Hook for fetching filtered lists of movie credits. */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";
import {useQueryOptionDefaults} from "@/common/_feat/handle-query/useQueryOptionDefaults.ts";
import {MovieCreditQueryOptions} from "@/domains/movie-credits/_schemas/query-options/MovieCreditQueryOptionsSchema.ts";
import {ListQueryConfig} from "@/common/_types";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {find} from "@/domains/movie-credits/_feat/crud";
import {MovieCreditCRUDQueryKeys} from "@/domains/movie-credits/_feat/crud-hooks/queryKeys.ts";

/** Configuration for movie credit queries including filters and validation schema. */
type FetchQueries<TData = unknown> = ListQueryConfig<TData, MovieCreditQueryOptions>;

/** Fetches a list of movie credits based on provided filters and validates the output. */
export function useFetchMovieCredits<TData = unknown>(
    {schema, queries, config, options}: FetchQueries<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchMovieCredits = buildQueryFn<TData>({
        action: () => find({queries, config}),
        schema,
    });

    return useQuery({
        queryKey: MovieCreditCRUDQueryKeys.query({...queries, ...config}),
        queryFn: fetchMovieCredits,
        ...useQueryOptionDefaults(options),
    });
}