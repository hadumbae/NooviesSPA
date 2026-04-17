/**
 * @fileoverview Mutation key factory for Person CRUD operations.
 */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

/**
 * Centrally managed mutation keys for Person create, update, and delete operations.
 */
export const PersonCRUDMutationKeys = buildQueryKey(
    ["persons", "crud"],
    {
        submit: ["submit"],
        destroy: ["destroy"]
    },
);