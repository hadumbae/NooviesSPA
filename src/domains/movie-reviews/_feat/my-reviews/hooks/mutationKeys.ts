/**
 * @fileoverview Mutation keys for managing user-specific movie review actions.
 */

import {buildQueryKey} from "@/common/_feat";

/** Mutation key factory for submitting and destroying user reviews. */
export const MyReviewsMutationKeys = buildQueryKey(
    ["movie_reviews", "user"],
    {
        submit: ["submit", "current"],
        destroy: ["destroy", "current"],
    }
);