/**
 * @fileoverview Repository for fetching movie-related view data for the client-facing interface.
 *
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import {
    FetchInfoOverviewConfig,
    GetCreditsForMovieViewParams,
    GetShowingsForMovieViewParams
} from "src/domains/movies/_feat/client-view-data/repositories/repository.types.ts";
import {buildURL} from "@/common/features/fetch-api";
import {MovieClientViewBaseURL} from "@/domains/movies/_feat/client-view-data/repositories/baseURL.ts";
import {MovieInfoOverviewViewData} from "@/domains/movies/_feat/client-view-data";

/** Fetches high-level overview data for a specific movie including reviews. */
export function getFetchMovieInfoOverviewViewData(
    {slug, queries = {revPage: 1, revPerPage: 3}}: FetchInfoOverviewConfig
): Promise<RequestReturns<MovieInfoOverviewViewData>> {
    const url = buildURL({
        baseURL: MovieClientViewBaseURL,
        path: `/item/${slug}/info-overview`,
        queries,
    });

    return useFetchAPI({url, method: "GET"});
}

/** Retrieves the cast and crew credits for a specific movie. */
export function getCreditsForMovieView(
    {slug}: GetCreditsForMovieViewParams
): Promise<RequestReturns> {
    const url = buildURL({
        baseURL: MovieClientViewBaseURL,
        path: `/item/${slug}/credits`
    });

    return useFetchAPI({url, method: "GET"});
}

/** Fetches scheduled showings and cinema information for a specific movie. */
export function getShowingsForMovieView(
    {slug, queries}: GetShowingsForMovieViewParams
): Promise<RequestReturns> {
    const url = buildURL({
        baseURL: MovieClientViewBaseURL,
        path: `/item/${slug}/showings`,
        queries
    });

    return useFetchAPI({url, method: "GET"});
}