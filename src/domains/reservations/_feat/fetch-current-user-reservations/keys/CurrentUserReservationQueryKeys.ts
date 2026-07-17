/**
 * @fileoverview Query key definitions for current user reservation data.
 */

import {buildQueryKey} from "@/common/_feat";

/** Query key factory for current user reservation data. */
export const CurrentUserReservationQueryKeys = buildQueryKey(
    ["reservations", "list"],
    {
        "currentUser": ["current-user"],
    }
);