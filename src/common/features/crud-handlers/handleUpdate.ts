/**
 * @fileoverview Higher-order function for generating standardized "Update" request handlers.
 * Facilitates partial resource updates (PATCH) targeting a specific document ID,
 * while allowing for backend configuration via query parameters.
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

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
    ): Promise<RequestReturns<TReturns>> => {
        const url = buildQueryURL({
            baseURL,
            path: `item/${_id}`,
            queries: config,
        });

        return useFetchAPI({url, method: "PATCH", data});
    };
}