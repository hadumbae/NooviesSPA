/**
 * @fileoverview Query key factory for showing CRUD operations.
 */

import {buildQueryKey} from "@/common/_feat";
import {ShowingBaseQueryKeys} from "@/domains/showings/_feat/base-query-keys";

/** Centralised query keys for fetching and invalidating showing data. */
export const ShowingCRUDQueryKeys = buildQueryKey(
    ShowingBaseQueryKeys.crud,
    {
        _id: ["_id"],
        slug: ["slug"],
        list: ["list"],
        find: ["list", "find"],
        paginated: ["list", "paginated"],
        query: ["list", "query"],
        queryPaginated: ["list", "query", "paginated"],
    },
);