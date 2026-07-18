/**
 * @fileoverview Higher-order function for generating standardized "Update" request handlers.
 * Facilitates partial resource updates (PATCH) targeting a specific document ID,
 * while allowing for backend configuration via query parameters.
 */

import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns.ts";
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI.ts";
import {RequestOptions} from "@/common/_types/request/RequestOptions.ts";
import {ObjectId} from "@/common/_schemas";
import {buildURL} from "@/common/_feat/fetch-api";

/**
 * Parameters for updating a specific document.
 */
export type UpdateDocumentConfig<TData = unknown> = {
    _id: ObjectId;
    data: TData;
    config?: Omit<RequestOptions, "limit">;
};

/**
 * Higher-order function that generates a fetcher for resource updates.
 */
export function handleUpdate(baseURL: string) {
    return async <TData = unknown, TReturns = unknown>(
        {_id, config, data}: UpdateDocumentConfig<TData>
    ): Promise<FetchRequestReturns<TReturns>> => {
        const url = buildURL({
            baseURL,
            path: `/item/${_id}`,
            queries: config,
        });

        return useFetchAPI({url, method: "PATCH", data});
    };
}