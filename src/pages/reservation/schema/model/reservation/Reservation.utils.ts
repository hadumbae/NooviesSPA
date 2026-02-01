import {RefinementCtx} from "zod";
import {
    ReservationBase
} from "@/pages/reservation/schema/model/reservation/Reservation.types.ts";
import {ReservationStatus} from "@/pages/reservation/schema/enum/ReservationStatusEnumSchema.ts";
import {ReservationDetailsBase} from "@/pages/reservation/schema/model/reservation/ReservationDetails.types.ts";

const DATE_MAP: Partial<Record<ReservationStatus, keyof ReservationBase>> = {
    PAID: "datePaid",
    CANCELLED: "dateCancelled",
    REFUNDED: "dateRefunded",
    EXPIRED: "dateExpired",
};

/**
 * @summary
 * Lifecycle-based date validation for reservations.
 *
 * @description
 * Enforces that a specific lifecycle timestamp is present based on the
 * current reservation `status`.
 *
 * The required date field is resolved dynamically via {@link DATE_MAP},
 * ensuring a single source of truth for status → date relationships.
 *
 * Intended for reuse across reservation schemas to keep lifecycle
 * validation rules consistent and centralized.
 *
 * @param values - Parsed reservation values
 * @param ctx - Zod refinement context for reporting validation issues
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
