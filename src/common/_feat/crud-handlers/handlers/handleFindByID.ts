/**
 * @fileoverview Higher-order function for generating standardized "Find By ID" request handlers.
 * Specialized for retrieving a single entity from a CRUD-compliant endpoint,
 * supporting optional configuration for population and virtuals.
 */

import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns.ts";
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI.ts";
import {RequestOptions} from "@/common/_types/request/RequestOptions.ts";
import {ObjectId} from "@/common/_schemas";
import {buildURL} from "@/common/_feat/fetch-api";

/**
 * Parameters for fetching a specific document by its unique identifier.
 */
export type FindDocumentByIDConfig = {
    _id: ObjectId;
    config?: Omit<RequestOptions, "limit">;
};

/**
 * Higher-order function that generates a fetcher for individual document retrieval.
 */
export function handleFindByID(baseURL: string) {
    return async <TReturns = unknown>(
        {_id, config}: FindDocumentByIDConfig
    ): Promise<FetchRequestReturns<TReturns>> => {
        const url = buildURL({
            baseURL,
            path: `/item/${_id}`,
            queries: config,
        });

        return useFetchAPI({url, method: "GET"});
    };
}