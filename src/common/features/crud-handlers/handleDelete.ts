/**
 * @fileoverview Higher-order function for generating standardized "Delete" request handlers.
 * Targets a specific resource by its unique identifier using the DELETE HTTP method,
 * adhering to standard RESTful patterns for item removal.
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

/**
 * Parameters required to delete a specific document.
 */
export type DeleteDocumentConfig = {
    _id: ObjectId;
};

/**
 * Higher-order function that generates a fetcher for resource deletion.
 */
export function handleDelete(baseURL: string) {
    return async <TReturns = unknown>(
        params: DeleteDocumentConfig
    ): Promise<RequestReturns<TReturns>> => {
        const {_id} = params;

        const url = buildQueryURL({
            baseURL,
            path: `item/${_id}`,
        });

        return useFetchAPI({url, method: "DELETE"});
    };
}