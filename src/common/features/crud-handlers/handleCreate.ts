/**
 * @fileoverview Higher-order function for generating standardized "Create" request handlers.
 * Facilitates the creation of new resources via POST requests to a central "item" endpoint.
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {buildURL} from "@/common/features/fetch-api";

/**
 * Parameters for creating a new document.
 */
export type CreateDocumentConfig<TData = unknown> = {
    data: TData;
    config?: Pick<RequestOptions, "virtuals" | "populate">;
};

/**
 * Generates an asynchronous fetcher for resource creation using the POST method.
 */
export function handleCreate(baseURL: string) {
    return async <TData = unknown, TReturns = unknown>(
        {config, data}: CreateDocumentConfig<TData>
    ): Promise<RequestReturns<TReturns>> => {
        const url = buildURL({
            baseURL,
            path: `/item`,
            queries: config,
        });

        return useFetchAPI({url, method: "POST", data});
    };
}