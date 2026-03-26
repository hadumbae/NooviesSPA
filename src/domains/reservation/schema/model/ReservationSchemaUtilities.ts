/**
 * @file Shared validation logic for Reservation lifecycle and audit constraints.
 * @filename ReservationSchemaUtilities.ts
 */

import {RefinementCtx} from "zod";
import {ReservationStatus} from "@/domains/reservation/schema/model/fields/ReservationStatusEnumSchema.ts";
import {ReservationBase} from "@/domains/reservation/schema/model/ReservationBaseSchema.ts";
import {PopulatedReservationBase} from "@/domains/reservation/schema/model/PopulatedReservationBaseSchema.ts";
import {AdminReservationBase} from "@/domains/reservation/schema/model/AdminReservationBaseSchema.ts";

/**
 * Mapping of status constants to their respective mandatory audit timestamp fields.
 */
const DATE_MAP: Partial<Record<ReservationStatus, keyof ReservationBase>> = {
    PAID: "datePaid",
    CANCELLED: "dateCancelled",
    REFUNDED: "dateRefunded",
    EXPIRED: "dateExpired",
};

/**
 * Union of reservation shapes compatible with lifecycle refinement.
 */
type ValuesType = ReservationBase | PopulatedReservationBase | AdminReservationBase;

/**
 * Enforces that terminal or transitional statuses have their corresponding dates populated.
 * @param `values` - The reservation object currently being validated.
 * @param `ctx` - The Zod refinement context for attaching issues.
 */
export const superRefineReservation = (values: ValuesType, ctx: RefinementCtx): void => {
    const status = values.status as ReservationStatus;
    const requiredDate = DATE_MAP[status];

    /** Trigger issue if the status requires a timestamp that is missing. */
    if (requiredDate && values[requiredDate] === undefined) {
        ctx.addIssue({
            code: "invalid_date",
            path: [requiredDate],
            message: `The field '${requiredDate}' is required for ${status.toLowerCase()} reservations.`,
        });
    }
};