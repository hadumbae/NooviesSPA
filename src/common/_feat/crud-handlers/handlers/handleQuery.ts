/**
 * @fileoverview Generic service factory for executing advanced aggregation queries.
 * Constructs a standardized fetch handler that merges pagination, domain-specific
 * filters, and global request configuration into a single versioned URL.
 */

import {PaginationValues} from "@/common/_feat/fetch-pagination-search-params";
import {RequestOptions} from "@/common/_types/request/RequestOptions.ts";
import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns.ts";
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI.ts";
import {buildURL} from "@/common/_feat/fetch-api";

/**
 * Composite parameters for document aggregation queries.
 */
export type FindDocumentsByQueryConfig<TQueries extends Record<string, any>> = {
    queries?: TQueries;
    pagination?: Partial<PaginationValues>;
    config?: RequestOptions;
};

/**
 * Higher-order function that generates a specialized "query" fetcher.
 */
export function handleQuery(baseURL: string) {
    return async <TQueries extends Record<string, unknown>, TReturns = unknown>(
        {queries, config, pagination}: FindDocumentsByQueryConfig<TQueries>
    ): Promise<FetchRequestReturns<TReturns>> => {
        const url = buildURL({
            baseURL,
            path: "/query",
            queries: {
                ...pagination,
                ...queries,
                ...config,
            },
        });

        return useFetchAPI({url, method: "GET"});
    };
}