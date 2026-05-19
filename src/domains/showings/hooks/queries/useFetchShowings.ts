/**
 * @fileoverview Hook for fetching movie showings based on query parameters.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import ShowingRepository from "@/domains/showings/repositories/ShowingRepository.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {ShowingQueryOptions} from "@/domains/showings/schema/queries";

/** Parameters for the useFetchShowings hook. */
type FetchParams = {
    queries?: ShowingQueryOptions;
    config?: RequestOptions;
    options?: FetchQueryOptions<unknown>;
};

/** Fetches a list of showings filtered by the provided query options. */
export function useFetchShowings(
    {queries, config, options}: FetchParams = {}
): UseQueryResult<unknown, HttpResponseError> {
    const fetchShowingsByQuery = useQueryFnHandler({
        action: () => ShowingRepository.query({queries, config}),
        errorMessage: "Failed to fetch showings.",
    });

    return useQuery({
        queryKey: ["showings", "lists", "query", {...queries, ...config}],
        queryFn: fetchShowingsByQuery,
        ...useQueryOptionDefaults(options),
    });
}
