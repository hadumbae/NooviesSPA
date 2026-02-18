/**
 * @file UserFavouriteRepository.ts
 * Repository requests for user favourite movie endpoints.
 */

import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {PaginationValues} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";

const baseURL = `${import.meta.env.VITE_BASE_URL}/api/v1/profile`;

/**
 * Fetches the authenticated user's favourite movies.
 */
const getUserFavourites = (params: PaginationValues) => {
    const url = buildQueryURL({baseURL, path: "favourites/user", queries: params});
    return useFetchAPI({url, method: "GET"});
}

/**
 * Adds a movie to the user's favourites.
 */
const patchAddToUserFavourites = (movieID: ObjectId) => {
    const url = buildQueryURL({baseURL, path: "favourites/add"});
    return useFetchAPI({url, method: "PATCH", data: {movieID}});
}

/**
 * Removes a movie from the user's favourites.
 */
const patchRemoveFromUserFavourites = (movieID: ObjectId) => {
    const url = buildQueryURL({baseURL, path: "favourites/remove"});
    return useFetchAPI({url, method: "PATCH", data: {movieID}});
}

export {
    getUserFavourites,
    patchAddToUserFavourites,
    patchRemoveFromUserFavourites,
}
