/**
 * @fileoverview Hook for fetching paginated showing records with filtering options.
 *
 */

import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import ShowingRepository from "@/domains/showings/repositories/ShowingRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {PaginationValues} from "@/common/features/fetch-pagination-search-params";
import {ShowingQueryOptions} from "@/domains/showings/schema/queries";

/** Parameters for fetching paginated showings. */
type FetchParams<TData = unknown> = PaginationValues & {
    queries?: ShowingQueryOptions;
    config?: RequestOptions;
    options?: FetchQueryOptions<TData>;
};

/** Fetches a paginated list of showings based on provided search and pagination parameters. */
export default function useFetchPaginatedShowings(
    {page, perPage, queries, config, options}: FetchParams
): UseQueryResult<unknown, HttpResponseError> {
    const fetchShowings = useQueryFnHandler({
        action: () => ShowingRepository.paginated({page, perPage, queries, config}),
        errorMessage: "Failed to fetch paginated showings.",
    });

    return useQuery({
        queryKey: ["showings", "lists", "paginated", {...queries, ...config}],
        queryFn: fetchShowings,
        ...useQueryOptionDefaults(options),
    });
}
