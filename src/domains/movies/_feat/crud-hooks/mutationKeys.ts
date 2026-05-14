/**
 * @fileoverview Defines mutation keys for movie CRUD operations.
 */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

/** Mutation keys for creating, updating, and deleting movie records. */
export const MovieCRUDMutationKeys = buildQueryKey(
    ["movies", "crud", "mutations"],
    {submitSingle: ["submit", "single"], deleteSingle: ["delete", "single"]},
);