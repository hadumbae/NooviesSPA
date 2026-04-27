/** @fileoverview Hook for fetching filtered lists of movie credits. */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {MovieCreditQueryOptions} from "@/domains/moviecredit/schemas/query-options/MovieCreditQueryOptionsSchema.ts";
import {ListQueryConfig} from "@/common/types";
import {buildQueryFn} from "@/common/features/validate-fetch-data";
import {find, MovieCreditCRUDQueryKeys} from "@/domains/moviecredit/_feat/crud";

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