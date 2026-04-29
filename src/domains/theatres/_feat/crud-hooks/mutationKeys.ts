/** @fileoverview Mutation keys for theatre CRUD operations. */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

/** Mutation keys used for creating, updating, and deleting theatres. */
export const TheatreCRUDMutationKeys = buildQueryKey(
    ["theatres", "mutations"],
    {submit: ["submit"], deleteSingle: ["delete", "single"]}
);