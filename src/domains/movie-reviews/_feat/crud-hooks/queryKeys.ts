/**
 * @fileoverview Defines query key constants for movie review CRUD operations.
 */

import {buildQueryKey} from "@/common/_feat";

/** Query keys for fetching, caching, and invalidating movie review data. */
export const MovieReviewCRUDQueryKeys = buildQueryKey(
    ["movie_reviews", "crud"],
    {
        list: ["list"],
        find: ["list", "find"],
        paginated: ["list", "paginated"],
    },
);