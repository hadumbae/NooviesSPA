/**
 * @fileoverview Repository for theatre search operations.
 */

import {BrowseTheatreByLocationConfig} from "@/domains/theatres/_feat/search-theatres/repository.types.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import {SearchTheatreBaseURL} from "@/domains/theatres/_feat/search-theatres/baseURL.ts";
import {buildURL} from "@/common/features/fetch-api";
import {PaginatedTheatresWithRecentShowings} from "@/domains/theatres/schema/theatre";

/**
 * Fetches the paginated theatres corresponding to a specific location configuration.
 */
export function theatresByLocation(
    {page, perPage, target, showingsPerTheatre}: BrowseTheatreByLocationConfig,
): Promise<RequestReturns<PaginatedTheatresWithRecentShowings>> {
    const url = buildURL({
        baseURL: SearchTheatreBaseURL,
        path: `/search/by-location/paginated`,
        queries: {
            page,
            perPage,
            target,
            showingsPerTheatre,
        },
    });

    return useFetchAPI({method: "GET", url});
}