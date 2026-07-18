/**
 * @fileoverview Higher-order function for generating standardized "Find" request handlers.
 * Facilitates non-paginated bulk retrieval of resources with support for filtering and sorting.
 */

import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns.ts";
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI.ts";
import {RequestOptions} from "@/common/_types/request/RequestOptions.ts";
import {buildURL} from "@/common/_feat/fetch-api";

/**
 * Parameters for finding multiple documents.
 */
export type FindDocumentsConfig<TQueries extends Record<string, any>> = {
    queries?: TQueries;
    config?: RequestOptions;
};

/**
 * Generates an asynchronous fetcher for retrieving multiple resources using the GET method.
 */
export const handleFind = (baseURL: string) => {
    return async <TQueries extends Record<string, unknown>, TReturns = unknown>(
        {queries, config}: FindDocumentsConfig<TQueries>
    ): Promise<FetchRequestReturns<TReturns>> => {
        const url = buildURL({
            baseURL,
            path: "/find",
            queries: {...queries, ...config},
        });

        return useFetchAPI({url, method: "GET"});
    };
};