/**
 * @file Foundational Zod schema and type for Reservation entity validation.
 * @filename ReservationBaseSchema.ts
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {SlugStringSchema} from "@/common/schema/strings/simple-strings/SlugString.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {ISO4217CurrencyCodeEnumSchema} from "@/common/schema/enums/ISO4217CurrencyCodeEnumSchema.ts";
import {ReservationTypeEnumSchema} from "@/domains/reservation/schema/model/fields/ReservationTypeEnumSchema.ts";
import {ReservationStatusEnumSchema} from "@/domains/reservation/schema/model/fields/ReservationStatusEnumSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {
    ReservationUniqueCodeSchema
} from "@/domains/reservation/schema/model/fields/ReservationUniqueCodeSchema.ts";
import {ModelTimestampsSchema} from "@/common/schema/models/ModelTimestampsSchema.ts";
import {UTCISO8601DateTimeSchema} from "@/common/schema/date-time/iso-8601/UTCISO8601DateTimeSchema.ts";
import {ReservedShowingSnapshotSchema} from "@/domains/reservation/schema/snapshot/ReservedShowingSnapshotSchema.ts";
import {BooleanValueSchema} from "@/common/schema/boolean/BooleanValueSchema.ts";

/**
 * Defines the temporal lifecycle of a reservation.
 * Includes initial booking, payment deadlines (TTL), and terminal state timestamps.
 */
const ReservationBaseDateSchema = z.object({
    /** Explicit timestamp of the initial seat/ticket reservation. */
    dateReserved: UTCISO8601DateTimeSchema,

    /** Timestamp recorded when payment is successfully processed. */
    datePaid: UTCISO8601DateTimeSchema.optional(),

    /** Timestamp recorded if the reservation is manually voided by an admin or user. */
    dateCancelled: UTCISO8601DateTimeSchema.optional(),

    /** Timestamp recorded if a financial refund is issued. */
    dateRefunded: UTCISO8601DateTimeSchema.optional(),

    /** Timestamp recorded if the reservation failed to reach 'PAID' status before `expiresAt`. */
    dateExpired: UTCISO8601DateTimeSchema.optional(),

    /** The system-calculated deadline for the user to complete payment. */
    expiresAt: UTCISO8601DateTimeSchema,
});

/**
 * Defines financial and quantity data for the transaction.
 */
const ReservationBasePaymentSchema = z.object({
    /** The number of tickets requested; must be a positive integer. */
    ticketCount: PositiveNumberSchema,

    /** The final monetary amount calculated for the transaction. */
    pricePaid: NonNegativeNumberSchema,

    /** Standardized 3-letter currency code (ISO 4217). */
    currency: ISO4217CurrencyCodeEnumSchema,

    /** Flag indicating if the transaction has been cleared by the payment provider. */
    isPaid: BooleanValueSchema,
});

/**
 * Defines relational references and immutable data snapshots.
 */
const ReservationBaseRelatedSchema = z.object({
    /** Reference to the User account associated with the booking. */
    user: IDStringSchema,

    /** Reference to the specific Showing/Event being booked. */
    showing: IDStringSchema,

    /** * A point-in-time copy of showing details.
     * Ensures historical accuracy if the original showing data is modified or deleted.
     */
    snapshot: ReservedShowingSnapshotSchema,
});

/**
 * Defines identification and administrative metadata.
 */
const ReservationBaseMetaSchema = z.object({
    /** Unique BSON identifier; read-only to ensure referential integrity. */
    _id: IDStringSchema.readonly(),

    /** URL-friendly identifier for routing purposes. */
    slug: SlugStringSchema.readonly(),

    /** Human-readable verification code used for ticket scanning and admin lookups. */
    uniqueCode: ReservationUniqueCodeSchema.readonly(),

    /** Discriminator for booking logic (e.g., specific seat selection vs general capacity). */
    reservationType: ReservationTypeEnumSchema,

    /** Current lifecycle status (RESERVED, PAID, CANCELLED, REFUNDED, EXPIRED). */
    status: ReservationStatusEnumSchema,

    /** Administrative notes. */
    notes: NonEmptyStringSchema
        .max(3000, "Must be 3000 characters or less.")
        .optional()
        .nullable(),
});

/**
 * Core validation schema defining the comprehensive structure of a Reservation record.
 */
export const ReservationBaseSchema = ModelTimestampsSchema.extend({
    ...ReservationBaseDateSchema.shape,
    ...ReservationBasePaymentSchema.shape,
    ...ReservationBaseRelatedSchema.shape,
    ...ReservationBaseMetaSchema.shape,
});

/**
 * TypeScript type inferred from {@link ReservationBaseSchema}.
 * Represents the base interface for all reservation-related data structures.
 */
export type ReservationBase = z.infer<typeof ReservationBaseSchema>;