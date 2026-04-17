/**
 * @fileoverview Higher-order function for generating standardized "Find" request handlers.
 * Facilitates non-paginated bulk retrieval of resources with support for filtering and sorting.
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import RequestQueryParams from "@/common/type/request/RequestQueryParams.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {buildURL} from "@/common/features/fetch-api";

/**
 * Parameters for finding multiple documents.
 */
export type FindDocumentsConfig<TQueries extends RequestQueryParams> = {
    queries?: TQueries;
    config?: RequestOptions;
};

/**
 * Generates an asynchronous fetcher for retrieving multiple resources using the GET method.
 */
export const handleFind = (baseURL: string) => {
    return async <TQueries extends Record<string, unknown>, TReturns = unknown>(
        {queries, config}: FindDocumentsConfig<TQueries>
    ): Promise<RequestReturns<TReturns>> => {
        const url = buildURL({
            baseURL,
            path: "/find",
            queries: {...queries, ...config},
        });

        return useFetchAPI({url, method: "GET"});
    };
};