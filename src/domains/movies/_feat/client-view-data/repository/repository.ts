/**
 * @fileoverview Repository for fetching movie-related view data for the client-facing interface.
 *
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import {
    FetchInfoOverviewConfig,
    GetCreditsForMovieViewConfig,
    GetShowingsForMovieViewConfig
} from "@/domains/movies/_feat/client-view-data/repository/repository.types.ts";
import {buildURL} from "@/common/_feat/fetch-api";
import {MovieClientViewBaseURL} from "@/domains/movies/_feat/client-view-data/repository/baseURL.ts";
import {
    MovieInfoCreditViewData,
    MovieInfoOverviewViewData,
    MovieInfoShowingViewData
} from "@/domains/movies/_feat/client-view-data";

/** Fetches high-level overview data for a specific movie including reviews. */
export function getFetchMovieInfoOverviewViewData(
    {slug, queries = {reviewPage: 1, reviewPerPage: 3}}: FetchInfoOverviewConfig
): Promise<RequestReturns<MovieInfoOverviewViewData>> {
    const url = buildURL({
        baseURL: MovieClientViewBaseURL,
        path: `/item/${slug}/info-overview`,
        queries,
    });

    return useFetchAPI({url, method: "GET"});
}

/** Retrieves the cast and crew credits for a specific movie. */
export function getFetchMovieInfoCreditsViewData(
    {slug}: GetCreditsForMovieViewConfig
): Promise<RequestReturns<MovieInfoCreditViewData>> {
    const url = buildURL({
        baseURL: MovieClientViewBaseURL,
        path: `/item/${slug}/info-credits`,
    });

    return useFetchAPI({url, method: "GET"});
}

/** Fetches scheduled showings and cinema information for a specific movie. */
export function getShowingsForMovieView(
    {slug, queries}: GetShowingsForMovieViewConfig
): Promise<RequestReturns<MovieInfoShowingViewData>> {
    const url = buildURL({
        baseURL: MovieClientViewBaseURL,
        path: `/item/${slug}/info-showings`,
        queries
    });

    return useFetchAPI({url, method: "GET"});
}