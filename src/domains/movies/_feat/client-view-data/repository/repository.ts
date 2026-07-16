/**
 * @fileoverview Repository for fetching movie-related view data for the client-facing interface.
 */

import {buildURL} from "@/common/_feat/fetch-api";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI.ts";
import {MovieClientViewBaseURL} from "@/domains/movies/_feat/client-view-data/repository/baseURL.ts";
import {
    MovieInfoCreditViewData,
    MovieInfoOverviewViewData,
    MovieInfoReviewsViewData,
    MovieInfoShowingViewData
} from "@/domains/movies/_feat/client-view-data/schemas";
import {
    GetCreditsForMovieInfoViewConfig,
    GetOverviewDataForMovieInfoViewConfig,
    GetReviewsForMovieInfoViewConfig,
    GetShowingsForMovieInfoViewConfig
} from "@/domains/movies/_feat/client-view-data/repository/repository.types.ts";

/** Fetches high-level overview data for a specific movie including reviews. */
export function getOverviewDataForMovieInfoView(
    {slug, queries = {reviewPage: 1, reviewPerPage: 3}}: GetOverviewDataForMovieInfoViewConfig
): Promise<RequestReturns<MovieInfoOverviewViewData>> {
    const url = buildURL({
        baseURL: MovieClientViewBaseURL,
        path: `/item/${slug}/info-overview`,
        queries,
    });

    return useFetchAPI({url, method: "GET"});
}

/** Fetches user reviews for a specific movie. */
export function getReviewsForMovieInfoView(
    {slug, queries}: GetReviewsForMovieInfoViewConfig
): Promise<RequestReturns<MovieInfoReviewsViewData>> {
    const url = buildURL({
        baseURL: MovieClientViewBaseURL,
        path: `/item/${slug}/info-reviews`,
        queries,
    });

    return useFetchAPI({url, method: "GET"});
}

/** Retrieves the cast and crew credits for a specific movie. */
export function getCreditForMovieInfoView(
    {slug}: GetCreditsForMovieInfoViewConfig
): Promise<RequestReturns<MovieInfoCreditViewData>> {
    const url = buildURL({
        baseURL: MovieClientViewBaseURL,
        path: `/item/${slug}/info-credits`,
    });

    return useFetchAPI({url, method: "GET"});
}

/** Fetches scheduled showings and cinema information for a specific movie. */
export function getShowingsForMovieInfoView(
    {slug, queries}: GetShowingsForMovieInfoViewConfig
): Promise<RequestReturns<MovieInfoShowingViewData>> {
    const url = buildURL({
        baseURL: MovieClientViewBaseURL,
        path: `/item/${slug}/info-showings`,
        queries
    });

    return useFetchAPI({url, method: "GET"});
}