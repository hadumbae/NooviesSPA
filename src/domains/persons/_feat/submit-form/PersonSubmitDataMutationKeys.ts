/**
 * @fileoverview Mutation key factory for Person data submissions.
 */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

/**
 * Centrally managed mutation keys for Person create and update operations.
 */
export const PersonSubmitDataMutationKeys = buildQueryKey(
    ["persons", "submit"],
    {
        data: ["data"]
    },
);