/**
 * @fileoverview Repository for retrieving public client-facing data for Movies.
 * Interfaces with specialized view-data endpoints to provide aggregated content
 * for movie detail pages, such as cast credits and theater showtimes.
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import {
    GetCreditsForMovieViewParams,
    GetShowingsForMovieViewParams
} from "@/domains/movies/views/client/repositories/MovieClientViewRepository.types.ts";
import {buildURL} from "@/common/features/fetch-api";
import {MovieClientViewBaseURL} from "@/domains/movies/views/client/repositories/MovieClientViewBaseURL.ts";

/**
 * Retrieves grouped movie credits (Cast and Crew) for a specific movie.
 */
export function getCreditsForMovieView(
    {slug}: GetCreditsForMovieViewParams
): Promise<RequestReturns> {
    const url = buildURL({
        baseURL: MovieClientViewBaseURL,
        path: `/item/${slug}/credits`
    });

    return useFetchAPI({url, method: "GET"});
}

/**
 * Retrieves a paginated list of upcoming showings for a specific movie.
 */
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