/**
 * @file Shared validation utilities for Reservation lifecycle constraints.
 * @filename ReservationSchemaUtilities.ts
 */

import {RefinementCtx} from "zod";
import {ReservationStatus} from "@/domains/reservation/schema/enum/ReservationStatusEnumSchema.ts";
import {
    ReservationBase
} from "@/domains/reservation/schema/model/reservation/ReservationBaseSchema.ts";
import {ReservationDetailsBase} from "@/domains/reservation/schema/model/reservation/PopulatedReservationBaseSchema.ts";

/**
 * Mapping of {@link ReservationStatus} to its corresponding mandatory timestamp field.
 * Used to ensure audit trails are present when a reservation transitions to a terminal state.
 */
const DATE_MAP: Partial<Record<ReservationStatus, keyof ReservationBase>> = {
    PAID: "datePaid",
    CANCELLED: "dateCancelled",
    REFUNDED: "dateRefunded",
    EXPIRED: "dateExpired",
};

/**
 * Zod {@link superRefine} function that enforces status-based date requirements.
 * * @description
 * This utility ensures that if a reservation is marked with a specific status,
 * the associated audit date (e.g., `datePaid` for status `PAID`) is not undefined.
 * * It is compatible with both raw {@link ReservationBase} and
 * {@link ReservationDetailsBase} (populated) shapes.
 *
 * @param values - The reservation data being validated.
 * @param ctx - The Zod refinement context used to inject custom validation issues.
 * * @example
 * // If status is 'CANCELLED', this checks that 'dateCancelled' is present.
 */
export const superRefineReservation = (values: ReservationBase | ReservationDetailsBase, ctx: RefinementCtx): void => {
    const status = values.status as ReservationStatus;
    const requiredDate = DATE_MAP[status];

    if (requiredDate && values[requiredDate] === undefined) {
        ctx.addIssue({
            code: "invalid_date",
            path: [requiredDate],
            message: `Required for ${status.toLowerCase()} reservations.`,
        });
    }
};