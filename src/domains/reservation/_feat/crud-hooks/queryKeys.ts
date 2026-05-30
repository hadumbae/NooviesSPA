/**
 * @fileoverview Defines query key factories for reservation CRUD operations.
 */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

/** Query key factory for reservation CRUD operations including ID and slug lookups. */
export const ReservationCRUDQueryKeys = buildQueryKey(
    ["reservations", "crud"],
    {_id: ["_id"], slug: ["slug"]}
);