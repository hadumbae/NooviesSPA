/**
 * @fileoverview Defines query keys for managing user-specific movie review data fetching and caching.
 */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

/** Query key factory for the current user's movie reviews and lists. */
export const MyReviewsQueryKeys = buildQueryKey(
    ["movie_reviews", "user"],
    {current: ["lists", "current"]}
);