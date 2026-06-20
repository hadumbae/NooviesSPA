/**
 * @fileoverview Mutation key factory for Person create, update, and delete operations.
 */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

/**
 * Centrally managed mutation keys for Person CRUD operations.
 */
export const PersonCRUDMutationKeys = buildQueryKey(
    ["persons", "crud"],
    {
        submit: ["submit"],
        destroy: ["destroy"]
    },
);