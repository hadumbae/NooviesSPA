/**
 * @fileoverview Parameter type definitions for administrative reservation update repository functions.
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {UpdateReservationNotesFormData} from "@/domains/reservations/_feat/update-reservations/hooks";

/** Parameters for updating administrative notes on a reservation. */
export type PatchUpdateReservationNotesParams = {
    _id: ObjectId;
    data: UpdateReservationNotesFormData;
}

/** Parameters for resetting or extending a reservation's expiration TTL. */
export type PatchResetReservationExpiryParams = {
    _id: ObjectId;
}

/** Parameters for transitioning a reservation to a CANCELLED status. */
export type PatchCancelReservationParams = {
    _id: ObjectId;
    data: UpdateReservationNotesFormData;
}

/** Parameters for transitioning a reservation to a REFUNDED status. */
export type PatchRefundReservationParams = {
    _id: ObjectId;
    data: UpdateReservationNotesFormData;
}