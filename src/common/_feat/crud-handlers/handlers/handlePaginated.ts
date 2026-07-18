/**
 * @fileoverview Higher-order function for generating standardized paginated request handlers.
 * Facilitates faceted search and pagination by merging limit, offset, and filter parameters.
 */

import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns.ts";
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI.ts";
import {RequestOptions} from "@/common/_types/request/RequestOptions.ts";
import {PaginationValues} from "@/common/_feat/fetch-pagination-search-params";
import {buildURL} from "@/common/_feat/fetch-api";

/**
 * Composite parameters for requesting paginated document sets.
 */
export type FindPaginatedDocumentsConfig<TQueries extends Record<string, any>> = {
    pagination: PaginationValues;
    queries?: TQueries;
    config?: RequestOptions;
};

/**
 * Generates an asynchronous fetcher for paginated resource retrieval using the GET method.
 */
export const handlePaginated = (baseURL: string) => {
    return async <TQueries extends Record<string, unknown>, TReturns = unknown>(
        {queries, config, pagination}: FindPaginatedDocumentsConfig<TQueries>
    ): Promise<FetchRequestReturns<TReturns>> => {
        const url = buildURL({
            baseURL,
            path: "/paginated",
            queries: {
                ...pagination,
                ...queries,
                ...config,
            },
        });

        return useFetchAPI({url, method: "GET"});
    };
};