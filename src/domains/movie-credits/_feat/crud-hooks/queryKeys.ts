/** @fileoverview Query key factory for Movie Credit CRUD operations. */

import {buildQueryKey} from "@/common/_feat";

/** Query key configuration for fetching, filtering, and paginating movie credits. */
export const MovieCreditCRUDQueryKeys = buildQueryKey(
    ["movie-credits", "crud"],
    {
            _id: ["_id"],
            slug: ["slug"],
            list: ["list"],
            query: ["list", "query"],
            paginated: ["list", "paginated"],
            queryPaginated: ["list", "query", "paginated"],
    },
);