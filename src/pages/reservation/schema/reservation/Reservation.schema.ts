/**
 * @file Reservation.schema.ts
 *
 * @summary
 * Zod schemas for validating movie reservations and populated reservation details.
 *
 * @description
 * Provides:
 * - Base reservation validation (`ReservationBaseSchema`)
 * - Cross-field lifecycle validation via `superRefineReservation`
 * - Fully populated variants for API responses (`ReservationDetailsSchema`)
 *
 * The schemas enforce consistency between reservation status and
 * associated lifecycle dates (paid, cancelled, refunded, expired),
 * as well as future-facing expiration rules for unpaid reservations.
 */

import { RefinementCtx, z } from "zod";
import { DateTime } from "luxon";

import { IDStringSchema } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import { PositiveNumberSchema } from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import { ISO4217CurrencyCodeEnumSchema } from "@/common/schema/enums/ISO4217CurrencyCodeEnumSchema.ts";
import { UTCDayOnlyDateTimeSchema } from "@/common/schema/date-time/iso-8601/UTCDayOnlyDateTimeSchema.ts";
import { NonEmptyStringSchema } from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";

import { ReservationStatusEnumSchema } from "@/pages/reservation/schema/ReservationStatusEnumSchema.ts";
import { ReservationBase, ReservationDetailsBase } from "@/pages/reservation/schema/reservation/Reservation.types.ts";
import { PopulatedShowingSchema } from "@/pages/showings/schema/showing/Showing.schema.ts";
import { UserSchema } from "@/pages/users/schemas/user/User.schema.ts";

// --- Super Refine ---

/**
 * @summary
 * Cross-field lifecycle validation for reservations.
 *
 * @description
 * Ensures required lifecycle dates are present based on reservation status
 * and validates that expiration dates are not in the past.
 *
 * Shared between base and populated reservation schemas to guarantee
 * identical business rules regardless of population state.
 *
 * @param values - Parsed reservation values
 * @param ctx - Zod refinement context
 */
const superRefineReservation = <
    TValues extends ReservationBase | ReservationDetailsBase
>(
    values: TValues,
    ctx: RefinementCtx,
) => {
    const {
        status,
        datePaid,
        dateCancelled,
        dateRefunded,
        dateExpired,
        expiresAt,
    } = values;

    if (status === "PAID" && !datePaid) {
        ctx.addIssue({
            code: "invalid_date",
            path: ["datePaid"],
            message: "Date Paid required for paid reservations.",
        });
    }

    if (status === "CANCELLED" && !dateCancelled) {
        ctx.addIssue({
            code: "invalid_date",
            path: ["dateCancelled"],
            message: "Date Cancelled required for cancelled reservations.",
        });
    }

    if (status === "REFUNDED" && !dateRefunded) {
        ctx.addIssue({
            code: "invalid_date",
            path: ["dateRefunded"],
            message: "Date Refunded required for refunded reservations.",
        });
    }

    if (status === "EXPIRED" && !dateExpired) {
        ctx.addIssue({
            code: "invalid_date",
            path: ["dateExpired"],
            message: "Date Expired required for expired reservations.",
        });
    }

    if (expiresAt) {
        const now = DateTime.utc();
        const checkDate = expiresAt.endOf("day").toUTC();

        if (now >= checkDate) {
            ctx.addIssue({
                code: "invalid_date",
                path: ["expiresAt"],
                message: "Expiry date cannot be in the past.",
            });
        }
    }
};

// --- Reservation ---

/**
 * @summary
 * Base reservation schema.
 *
 * @description
 * Represents a reservation in its unpopulated form, using identifier
 * references for related entities.
 */
export const ReservationBaseSchema = z.object({
    /** User who owns the reservation. */
    user: IDStringSchema,

    /** Showing being reserved. */
    showing: IDStringSchema,

    /** Selected seating identifiers for the reservation. */
    selectedSeating: generateArraySchema(IDStringSchema),

    /** Total price paid or payable for the reservation. */
    pricePaid: PositiveNumberSchema,

    /** Currency used for the reservation price (ISO 4217). */
    currency: ISO4217CurrencyCodeEnumSchema,

    /** Date the reservation was created. */
    dateReserved: UTCDayOnlyDateTimeSchema,

    /** Date the reservation was paid (required if status is PAID). */
    datePaid: UTCDayOnlyDateTimeSchema.optional(),

    /** Date the reservation was cancelled (required if status is CANCELLED). */
    dateCancelled: UTCDayOnlyDateTimeSchema.optional(),

    /** Date the reservation was refunded (required if status is REFUNDED). */
    dateRefunded: UTCDayOnlyDateTimeSchema.optional(),

    /** Date the reservation expired (required if status is EXPIRED). */
    dateExpired: UTCDayOnlyDateTimeSchema.optional(),

    /**
     * Expiration date for unpaid reservations.
     * Must be in the future when provided.
     */
    expiresAt: UTCDayOnlyDateTimeSchema.optional(),

    /** Current lifecycle status of the reservation. */
    status: ReservationStatusEnumSchema,

    /** Optional internal notes or remarks. */
    notes: NonEmptyStringSchema
        .max(3000, "Must be 3000 characters or less.")
        .optional(),
});

/**
 * @summary
 * Reservation schema with lifecycle validation.
 */
export const ReservationSchema =
    ReservationBaseSchema.superRefine(superRefineReservation);

// --- Reservation Details ---

/**
 * @summary
 * Fully populated reservation schema.
 *
 * @description
 * Extends the base reservation schema with populated user, showing,
 * and seating data for API responses.
 */
export const ReservationDetailsBaseSchema = ReservationBaseSchema.extend({
    user: UserSchema,
    showing: PopulatedShowingSchema,
    selectedSeating: generateArraySchema(PopulatedShowingSchema),
});

/**
 * @summary
 * Populated reservation schema with lifecycle validation.
 */
export const ReservationDetailsSchema =
    ReservationDetailsBaseSchema.superRefine(superRefineReservation);
