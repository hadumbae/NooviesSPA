/**
 * @fileoverview Higher-order function for generating standardized paginated request handlers.
 * Facilitates faceted search and pagination by merging limit, offset, and filter parameters.
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import RequestQueryParams from "@/common/type/request/RequestQueryParams.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {PaginationValues} from "@/common/features/fetch-pagination-search-params";
import {buildURL} from "@/common/features/fetch-api";

/**
 * Composite parameters for requesting paginated document sets.
 */
export type FindPaginatedDocumentsConfig<TQueries extends RequestQueryParams> = {
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
    ): Promise<RequestReturns<TReturns>> => {
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