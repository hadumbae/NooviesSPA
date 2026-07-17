/**
 * @fileoverview Query key factory for movie review fetching operations.
 */

import {buildQueryKey} from "@/common/_feat";

/** Query keys for fetching movie reviews by movie ID, including details and featured status. */
export const FetchByMovieQueryKeys = buildQueryKey(
    ["movie_reviews", "lists", "by_movie"],
    {
        movie: ["movie"],
        details: ["details"],
        featured: ["featured"],
    }
)