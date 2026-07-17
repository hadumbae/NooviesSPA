/**
 * @fileoverview Type-safe mutation key factory for the Reservation Update feature.
 */

import {buildQueryKey} from "@/common/_feat";

/**
 * Centralized factory for TanStack Query mutation keys related to reservation lifecycle updates.
 */
export const ReservationUpdateMutationKeys = buildQueryKey(
    ["reservations", "feat", "update"],
    {
        notes: ["notes"],
        expiry: ["expiry"],
        cancel: ["cancel"],
        refund: ["refund"],
    }
);