/** @fileoverview Query key factory for Movie Credit CRUD operations. */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

/** Query key configuration for fetching, filtering, and paginating movie credits. */
export const MovieCreditCRUDQueryKeys = buildQueryKey(
    ["movie-credits", "crud"],
    {
            _id: ["_id"],
            slug: ["slug"],
            query: ["list", "query"],
            paginated: ["list", "paginated"],
            queryPaginated: ["list", "query", "paginated"],
    },
);