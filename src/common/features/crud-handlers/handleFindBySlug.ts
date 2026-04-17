/**
 * @fileoverview Higher-order function for generating standardized "Find By Slug" request handlers.
 * Facilitates document retrieval using a human-readable slug identifier.
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {buildURL} from "@/common/features/fetch-api";

/**
 * Parameters for fetching a document by its slug.
 */
export type FindDocumentBySlugConfig = {
    slug: string;
    config?: Omit<RequestOptions, "limit">;
};

/**
 * Generates an asynchronous fetcher for slug-based lookups using the GET method.
 */
export function handleFindBySlug(baseURL: string) {
    return async <TReturns = unknown>(
        {slug, config}: FindDocumentBySlugConfig
    ): Promise<RequestReturns<TReturns>> => {
        const url = buildURL({
            baseURL,
            path: `/item/${slug}/slug`,
            queries: config,
        });

        return useFetchAPI({url, method: "GET"});
    };
}