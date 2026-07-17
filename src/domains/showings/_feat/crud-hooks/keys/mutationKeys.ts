/**
 * @fileoverview Defines mutation keys for showing CRUD operations.
 */

import {buildQueryKey} from "@/common/_feat";

/** Mutation key factory for creating, updating, and deleting showings. */
export const ShowingCRUDMutationKeys = buildQueryKey(
    ["showings", "crud"],
    {
        submitSingle: ["submit", "single"],
        deleteSingle: ["delete", "single"],
    },
);