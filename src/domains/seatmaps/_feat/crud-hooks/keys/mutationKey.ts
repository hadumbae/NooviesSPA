/**
 * @fileoverview Mutation keys for seat map CRUD operations.
 */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

/** Mutation key factory for creating, updating, and deleting seat maps. */
export const SeatMapCRUDMutationKeys = buildQueryKey(
    ["seat_maps", "crud"],
    {
        submit: ["submit"],
        destroy: ["destroy"],
    }
);