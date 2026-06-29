/** @fileoverview Mutation key factory for Movie Credit CRUD operations. */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

/** Mutation key configuration for creating, updating, and deleting movie credits. */
export const MovieCreditCRUDMutationKeys = buildQueryKey(
    ["movie-credits", "mutations"],
    {submit: ["submit"], deleteSingle: ["delete", "single"]}
);