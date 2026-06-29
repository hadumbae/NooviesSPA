/**
 * @fileoverview Repository for theatre search operations.
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import {buildURL} from "@/common/_feat/fetch-api";
import {PaginatedItems} from "@/common/types";

import {TheatreWithRecentShowings} from "@/domains/theatres/_schema";
import {SearchTheatreBaseURL} from "@/domains/theatres/_feat/search-theatres/repository/baseURL.ts";
import {BrowseTheatreByLocationConfig} from "@/domains/theatres/_feat/search-theatres/repository/repository.types.ts";

/**
 * Fetches the paginated theatres corresponding to a specific location configuration.
 */
export function theatresByLocation(
    {page, perPage, target, showingsPerTheatre}: BrowseTheatreByLocationConfig,
): Promise<RequestReturns<PaginatedItems<TheatreWithRecentShowings>>> {
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