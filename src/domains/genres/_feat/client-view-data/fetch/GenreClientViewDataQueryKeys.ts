/**
 * @fileoverview Query key factory for the Genre Client View Data domain.
 *
 */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

/** Registry of query keys for public genre view data. */
export const GenreClientViewDataQueryKeys = buildQueryKey(
    ["genres", "views", "client"],
    {withMovies: ["item", "with-movies"]},
);