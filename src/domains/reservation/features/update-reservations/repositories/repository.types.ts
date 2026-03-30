/**
 * @file Parameter type definitions for administrative reservation update repository functions.
 * @filename repository.types.ts
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {UpdateReservationNotesFormSubmit} from "@/domains/reservation/features/update-reservations/schemas";

/**
 * Parameters for updating administrative notes on a reservation.
 */
export type PatchUpdateReservationNotesParams = {
    _id: ObjectId;
    data: UpdateReservationNotesFormSubmit;
}

/**
 * Parameters for resetting or extending a reservation's expiration TTL.
 */
export type PatchResetReservationExpiryParams = {
    _id: ObjectId;
}

/**
 * Parameters for transitioning a reservation to a 'CANCELLED' status.
 */
export type PatchCancelReservationParams = {
    _id: ObjectId;
    data: UpdateReservationNotesFormSubmit;
}

/**
 * Parameters for transitioning a reservation to a 'REFUNDED' status.
 */
export type PatchRefundReservationParams = {
    _id: ObjectId;
    data: UpdateReservationNotesFormSubmit;
}