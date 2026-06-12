/**
 * @fileoverview Defines mutation keys for managing user movie favorites.
 */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

/** Mutation keys for user favorite actions. */
export const ManageUserFavouritesMutationKeys = buildQueryKey(
    ["user", "profile", "favourites"],
    {toggleMovie: ["toggle", "movie"]}
);