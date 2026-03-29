/**
 * @file Type-safe mutation key factory for the Reservation Update feature.
 * @filename mutationKeys.ts
 */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

/**
 * A centralized factory for TanStack Query mutation keys related to reservation lifecycle updates.
 */
export const ReservationUpdateMutationKeys = buildQueryKey(
    ["reservations", "feat", "update"],
    {
        /** Segment for administrative remarks and documentation updates. */
        notes: ["notes"],
        /** Segment for lifecycle extensions and expiration resets. */
        expiry: ["expiry"],
        /** Segment for terminal cancellation operations. */
        cancel: ["cancel"],
        /** Segment for financial refunding and payment reversals. */
        refund: ["refund"],
    }
);