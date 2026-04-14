import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

export const GenreCRUDQueryKeys = buildQueryKey(
    ["genres", "crud"],
    {
        _id: ["_id"],
        slug: ["slug"],
        query: ["list", "query"],
        paginated: ["list", "paginated"],
        queryPaginated: ["list", "query", "paginated"],
    }
);