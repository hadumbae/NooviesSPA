/**
 * @file Client repository for user favourite movie requests.
 * UserFavouriteRepository.ts
 */

import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {PaginationValues} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";

const baseURL = `${import.meta.env.VITE_API_URL}/api/v1/profile`;

/** Checks if a movie is favourited by the current user. */
export const getCheckIsFavouriteMovie = (movieID: ObjectId) => {
    const url = buildQueryURL({baseURL, path: `favourites/check/movie/${movieID}`});
    return useFetchAPI({url, method: "GET"});
}

/** Retrieves paginated favourites for the current user. */
const getUserFavourites = (params: PaginationValues) => {
    const url = buildQueryURL({baseURL, path: "favourites/user", queries: params});
    return useFetchAPI({url, method: "GET"});
}

/** Toggles favourite state for a movie. */
const patchToggleUserFavouriteMovie = (movieID: ObjectId) => {
    const url = buildQueryURL({baseURL, path: "favourites/toggle"});
    return useFetchAPI({url, method: "PATCH", data: {movieID}});
}

export {
    getUserFavourites,
    patchToggleUserFavouriteMovie,
}