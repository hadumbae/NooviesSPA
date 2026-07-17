/**
 * @fileoverview Mutation keys for movie image submission operations.
 */


import {buildQueryKey} from "@/common/_feat";

/** Mutation keys for submitting movie poster images. */
export const ManageMovieImageMutationKeys = buildQueryKey(
    ["movies", "submit-image"],
    {
        "submitPoster": ["poster-image", "submit"],
        "removePoster": ["poster-image", "remove"],
    },
);