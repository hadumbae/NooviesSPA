/**
 * @fileoverview Higher-order function for generating standardized "Soft Delete" request handlers.
 * Facilitates marking a resource as deleted without permanent removal from the database.
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

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
        params: SoftDeleteDocumentConfig
    ): Promise<RequestReturns<TReturns>> => {
        const {_id} = params;

        const url = buildQueryURL({
            baseURL,
            path: `item/${_id}/soft`,
        });

        return useFetchAPI({url, method: "DELETE"});
    };
}