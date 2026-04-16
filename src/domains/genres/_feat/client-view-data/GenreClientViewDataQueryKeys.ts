/**
 * @fileoverview Query key factory for the Genre Client View Data domain.
 * Provides a centralized, type-safe registry of keys for TanStack Query (React Query)
 * to manage caching and invalidation for public genre views.
 */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

/**
 * A structured collection of query keys for public genre view data.
 */
export const GenreClientViewDataQueryKeys = buildQueryKey(
    ["genres", "views", "client"],
    {withMovies: ["item", "with-movies"]},
);