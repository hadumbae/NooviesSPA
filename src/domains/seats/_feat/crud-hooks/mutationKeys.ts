/**
 * @fileoverview Build query keys for seat-related mutation operations used by React Query.
 */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

/**
 * Unique identifiers for seat mutations, including submission and single entity deletion.
 */
export const SeatCRUDMutationKeys = buildQueryKey(
    ["seats", "mutations"],
    {submit: ["submit"], deleteSingle: ["delete", "single"]}
);