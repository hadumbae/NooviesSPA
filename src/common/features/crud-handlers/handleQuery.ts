/**
 * @fileoverview Generic service factory for executing advanced aggregation queries.
 * Constructs a standardized fetch handler that merges pagination, domain-specific
 * filters, and global request configuration into a single versioned URL.
 */

import {PaginationValues} from "@/common/features/fetch-pagination-search-params";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import RequestQueryParams from "@/common/type/request/RequestQueryParams.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";

/**
 * Composite parameters for document aggregation queries.
 */
export type FindDocumentsByQueryConfig<TQueries extends RequestQueryParams> = {
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
    ): Promise<RequestReturns<TReturns>> => {
        const url = buildQueryURL({
            baseURL,
            path: "query",
            queries: {
                ...pagination,
                ...queries,
                ...config,
            },
        });

        return useFetchAPI({url, method: "GET"});
    };
}