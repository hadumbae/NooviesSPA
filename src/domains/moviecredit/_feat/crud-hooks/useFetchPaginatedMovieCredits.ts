/** @fileoverview Hook for fetching paginated lists of movie credits with optional filtering. */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {MovieCreditQueryOptions} from "@/domains/moviecredit/schemas/query-options/MovieCreditQueryOptionsSchema.ts";
import {PaginatedQueryConfig} from "@/common/types";
import {buildQueryFn} from "@/common/features/validate-fetch-data";
import {paginated} from "@/domains/moviecredit/_feat/crud/repository.ts";
import {MovieCreditCRUDQueryKeys} from "@/domains/moviecredit/_feat/crud/queryKeys.ts";

/** Configuration for paginated movie credit requests including pagination state and filters. */
type FetchParams<TData = unknown> = PaginatedQueryConfig<TData, MovieCreditQueryOptions>;

/** Fetches a paginated set of movie credits and validates the response against a schema. */
export function useFetchPaginatedMovieCredits<TData = unknown>(
    {schema, page, perPage, queries, config, options}: FetchParams<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchPaginatedCredits = buildQueryFn<TData>({
        action: () => paginated({pagination: {page, perPage}, queries, config}),
        schema,
    });

    return useQuery({
        queryKey: MovieCreditCRUDQueryKeys.paginated({...queries, ...config}),
        queryFn: fetchPaginatedCredits,
        ...useQueryOptionDefaults(options),
    });
}