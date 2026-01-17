/**
 * @file useFetchTheatres.ts
 *
 * React Query hook for fetching theatres by query.
 */

import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import TheatreRepository from "@/pages/theatres/repositories/TheatreRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {TheatreQueryOptions} from "@/pages/theatres/schema/queries/TheatreQueryOption.types.ts";
import {FetchByQueryParams} from "@/common/type/query/FetchByQueryParams.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

/**
 * Parameters for `useFetchTheatres`.
 *
 * @template TData - Returned data shape.
 */
type FetchQueries<TData = unknown> =
    FetchByQueryParams<TheatreQueryOptions, TData>;

/**
 * Fetch theatres using query filters.
 *
 * @template TData - Returned data shape.
 *
 * @param params - Query filters, request config, and query options.
 * @returns React Query result for the theatre request.
 */
export default function useFetchTheatres<TData = unknown>(
    params: FetchQueries<TData> = {}
): UseQueryResult<unknown, HttpResponseError> {
    const {queries, queryConfig, queryOptions} = params;

    const queryKey = [
        "theatres", "lists", "query",
        {...queries, ...queryConfig},
    ];

    const fetchTheatres = useQueryFnHandler({
        errorMessage: "Failed to fetch theatre data. Please try again.",
        action: () =>
            TheatreRepository.query({
                queries,
                config: queryConfig,
            }),
    });

    return useQuery({
        queryKey,
        queryFn: fetchTheatres,
        ...useQueryOptionDefaults(queryOptions),
    });
}
