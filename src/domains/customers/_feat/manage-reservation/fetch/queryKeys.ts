/**
 * @fileoverview Query key factory definitions for customer reservation cache management.
 */

import {buildQueryKey} from "@/common/_feat"

/** Query keys used for caching and fetching customer reservation views. */
export const CustomerReservationViewQueryKeys = buildQueryKey(
    ["customer", "views"],
    {reservation: ["profile", "reservations", "single"]},
)