/**
 * @file Higher-order function for generating standardized paginated request handlers.
 * @filename handlePaginated.ts
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import RequestQueryParams from "@/common/type/request/RequestQueryParams.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {PaginationValues} from "@/common/features/fetch-pagination-search-params";

/**
 * Composite parameter type for requesting paginated document sets.
 * ---
 */
export type PaginatedDocumentsParams<TQueries extends RequestQueryParams> = PaginationValues & {
    /** Domain-specific filters applied to the search query. */
    queries?: TQueries;
    /** Technical configuration for the request (e.g., populate, virtuals). */
    config?: RequestOptions;
};

/**
 * Creates an asynchronous data-fetching function configured for paginated API endpoints.
 * ---
 * @param baseURL - The root endpoint for the resource (e.g., `/api/v1/admin/genres`).
 * @returns A specialized function for fetching paginated data.
 */
export const handlePaginated = <TQueries extends Record<string, unknown>>(baseURL: string) => {
    return async (params: PaginatedDocumentsParams<TQueries>): Promise<RequestReturns<unknown>> => {
        const {queries, config, ...pagination} = params;

        const url = buildQueryURL({
            baseURL,
            path: "paginated",
            queries: {
                ...pagination,
                ...queries,
                ...config,
            },
        });

        return useFetchAPI({url, method: "GET"});
    };
}