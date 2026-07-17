/**
 * @fileoverview Query key factory for the Person CRUD domain.
 *
 */

import {buildQueryKey} from "@/common/_feat";

/** Hierarchical collection of query keys for Person administrative operations. */
export const PersonCRUDQueryKeys = buildQueryKey(
    ["persons", "crud"],
    {
        _id: ["_id"],
        slug: ["slug"],
        list: ["list"],
        query: ["list", "query"],
        paginated: ["list", "paginated"],
        queryPaginated: ["list", "query", "paginated"],
    }
);