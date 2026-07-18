/**
 * @fileoverview Higher-order function for generating standardized "Soft Delete" request handlers.
 * Facilitates marking a resource as deleted without permanent removal from the database.
 */

import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns.ts";
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI.ts";
import {ObjectId} from "@/common/_schemas";
import {buildURL} from "@/common/_feat/fetch-api";

/**
 * Parameters required to soft-delete a specific document.
 */
export type SoftDeleteDocumentConfig = {
    _id: ObjectId;
};

/**
 * Generates an asynchronous fetcher for soft-deleting a resource using the DELETE method.
 */
export function handleSoftDelete(baseURL: string) {
    return async <TReturns = unknown>(
        {_id}: SoftDeleteDocumentConfig
    ): Promise<FetchRequestReturns<TReturns>> => {
        const url = buildURL({
            baseURL,
            path: `/item/${_id}/soft`,
        });

        return useFetchAPI({url, method: "DELETE"});
    };
}