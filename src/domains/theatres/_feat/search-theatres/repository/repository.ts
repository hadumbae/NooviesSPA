/**
 * @fileoverview Repository for theatre search operations.
 */

import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns.ts";
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI.ts";
import {buildURL} from "@/common/_feat/fetch-api";
import {PaginatedItems} from "@/common/_types";

import {TheatreWithRecentShowings} from "@/domains/theatres/_schema";
import {SearchTheatreBaseURL} from "@/domains/theatres/_feat/search-theatres/repository/baseURL.ts";
import {BrowseTheatreByLocationConfig} from "@/domains/theatres/_feat/search-theatres/repository/repository.types.ts";

/**
 * Fetches the paginated theatres corresponding to a specific location configuration.
 */
export function theatresByLocation(
    {page, perPage, target, showingsPerTheatre}: BrowseTheatreByLocationConfig,
): Promise<FetchRequestReturns<PaginatedItems<TheatreWithRecentShowings>>> {
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