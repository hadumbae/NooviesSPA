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

/**
 * Core validation schema defining the structure of a Reservation record.
 */
export const ReservationBaseSchema = ModelTimestampsSchema.extend({
    /** Unique BSON identifier; read-only to prevent mutation after creation. */
    _id: IDStringSchema.readonly(),

    /** URL-friendly identifier derived from movie or event metadata. */
    slug: SlugStringSchema,

    /** Human-readable verification code used for administrative lookups and scanning. */
    uniqueCode: ReservationUniqueCodeSchema,

    /** Reference to the User account associated with the booking. */
    user: IDStringSchema,

    /** Reference to the specific Showing/Event being booked. */
    showing: IDStringSchema,

    /** The number of tickets requested; must be at least 1. */
    ticketCount: PositiveNumberSchema,

    /** The final monetary amount calculated for the transaction. */
    pricePaid: NonNegativeNumberSchema,

    /** Standardized 3-letter currency code (e.g., USD, EUR). */
    currency: ISO4217CurrencyCodeEnumSchema,

    /** Explicit timestamp of the initial seat/ticket reservation. */
    dateReserved: UTCISO8601DateTimeSchema,

    /** Timestamp recorded when payment is successfully processed. */
    datePaid: UTCISO8601DateTimeSchema.optional(),

    /** Timestamp recorded if the reservation is manually voided. */
    dateCancelled: UTCISO8601DateTimeSchema.optional(),

    /** Timestamp recorded if a refund is issued for a previously paid reservation. */
    dateRefunded: UTCISO8601DateTimeSchema.optional(),

    /** Timestamp recorded if the reservation was not paid within the TTL window. */
    dateExpired: UTCISO8601DateTimeSchema.optional(),

    /** The system-calculated deadline for the user to complete payment. */
    expiresAt: UTCISO8601DateTimeSchema,

    /** Discriminator for booking logic (e.g., General Admission vs Reserved Seating). */
    reservationType: ReservationTypeEnumSchema,

    /** Current lifecycle status (e.g., RESERVED, PAID, CANCELLED). */
    status: ReservationStatusEnumSchema,

    /** A point-in-time copy of showing details to protect against historical changes. */
    snapshot: ReservedShowingSnapshotSchema,

    /** Optional administrative notes or user remarks; constrained to 3000 characters. */
    notes: NonEmptyStringSchema
        .max(3000, "Must be 3000 characters or less.")
        .optional(),
});

/**
 * TypeScript type inferred from {@link ReservationBaseSchema}.
 */
export type ReservationBase = z.infer<typeof ReservationBaseSchema>;