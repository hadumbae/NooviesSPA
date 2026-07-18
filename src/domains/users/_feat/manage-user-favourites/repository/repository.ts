/**
 * @fileoverview Repository for managing user favourite movie data and interactions.
 */

import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI.ts";
import {ObjectId} from "@/common/_schemas";
import {PaginationValues} from "@/common/_feat/fetch-pagination-search-params";
import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns.ts";
import {buildURL} from "@/common/_feat/fetch-api";
import {IsFavouriteMovieMetadata} from "@/domains/users/_feat/manage-user-favourites/schema";
import {ManageUserFavouritesBaseURL} from "@/domains/users/_feat/manage-user-favourites/repository/baseURL";
import {PaginatedItems} from "@/common/_types";
import {MovieDetails} from "@/domains/movies/_schema/movie";

/** Checks if a specific movie is in the current user's favourites list. */
export async function getCheckIsFavouriteMovie(
    movieID: ObjectId
): Promise<FetchRequestReturns<IsFavouriteMovieMetadata>> {
    const url = buildURL({
        baseURL: ManageUserFavouritesBaseURL,
        path: `/favourites/check/movie/${movieID}`,
    });

    return useFetchAPI({url, method: "GET"});
}

/** Retrieves a paginated list of movies favourited by the current user. */
export async function getUserFavourites(
    params: PaginationValues
): Promise<FetchRequestReturns<PaginatedItems<MovieDetails>>> {
    const url = buildURL({
        baseURL: ManageUserFavouritesBaseURL,
        path: "/favourites/user",
        queries: params,
    });

    return useFetchAPI({url, method: "GET"});
}

/** Toggles the favourite status of a movie for the current user. */
export async function patchToggleUserFavouriteMovie(
    movieID: ObjectId
): Promise<FetchRequestReturns<unknown>> {
    const url = buildURL({
        baseURL: ManageUserFavouritesBaseURL,
        path: "/favourites/toggle",
    });

    return useFetchAPI({url, method: "PATCH", data: {movieID}});
}