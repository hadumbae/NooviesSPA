/**
 * @fileoverview Defines mutation keys for managing user movie favorites.
 */

import {buildQueryKey} from "@/common/_feat";

/** Mutation keys for user favorite actions. */
export const ManageUserFavouritesMutationKeys = buildQueryKey(
    ["user", "profile", "favourites"],
    {toggleMovie: ["toggle", "movie"]}
);