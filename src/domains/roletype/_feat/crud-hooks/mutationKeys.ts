/**
 * @fileoverview Defines mutation keys for role type CRUD operations.
 */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

/** Mutation keys for submitting and deleting role type records. */
export const RoleTypeCRUDMutationKeys = buildQueryKey(
    ["role_types", "crud"],
    {
        submitSingle: ["submit", "single"],
        deleteSingle: ["delete", "single"],
    }
);