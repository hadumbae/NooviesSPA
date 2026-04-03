/**
 * @file Higher-order function for generating standardized "Find" request handlers.
 * @filename handleFind.ts
 */

import {GetEntitiesParams} from "@/common/repositories/request-repository/RequestRepository.types.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";

/**
 * Creates an asynchronous data-fetching function configured for a specific resource base URL.
 * ---
 * @param baseURL - The root endpoint for the resource (e.g., `/api/v1/admin/genres`).
 * @returns A specialized function that accepts search parameters and returns a {@link RequestReturns} promise.
 */
export const handleFind = <TQueries extends Record<string, unknown>>(baseURL: string) => {
    return async (params: GetEntitiesParams<TQueries>): Promise<RequestReturns<unknown>> => {
        const {queries, config} = params;

        /**
         * Resolve the full endpoint by merging domain-specific filters
         * and technical request configurations (limit, skip, etc).
         */
        const url = buildQueryURL({
            baseURL,
            path: "find",
            queries: {...queries, ...config},
        });

        return useFetchAPI({url, method: "GET"});
    };
}