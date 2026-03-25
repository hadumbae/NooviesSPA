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
import {UTCISO8601StringSchema} from "@/common/schema/date-time/iso-8601/UTCISO8601StringSchema.ts";
import {ReservationTypeEnumSchema} from "@/domains/reservation/schema/enum/ReservationTypeEnumSchema.ts";
import {ReservationStatusEnumSchema} from "@/domains/reservation/schema/enum/ReservationStatusEnumSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {
    ReservationUniqueCodeSchema
} from "@/domains/reservation/schema/model/reservation/ReservationUniqueCodeSchema.ts";
import {ModelTimestampsSchema} from "@/common/schema/models/ModelTimestampsSchema.ts";

/**
 * Core validation schema defining the structure of a Reservation record.
 * ---
 * ### Composition
 * * **Inheritance:** Extends {@link ModelTimestampsSchema} for automated `createdAt`/`updatedAt` tracking.
 * * **Verification:** Integrates {@link ReservationUniqueCodeSchema} to enforce the `RES-XXXXX-XXXXX` identifier pattern.
 * * **Life-cycle:** Tracks progress through optional ISO-8601 timestamps (`datePaid`, `dateCancelled`, etc.).
 * * **Strictness:** References to `User` and `Showing` are validated as MongoDB ObjectIDs via {@link IDStringSchema}.
 */
export const ReservationBaseSchema = ModelTimestampsSchema.extend({
    /** Unique BSON identifier; read-only to prevent mutation after creation. */
    _id: IDStringSchema.readonly(),

    /** URL-friendly identifier derived from movie metadata. */
    slug: SlugStringSchema,

    /** Human-readable verification code for ticket scanning. */
    uniqueCode: ReservationUniqueCodeSchema,

    /** Reference to the User who owns the reservation. */
    user: IDStringSchema,

    /** Reference to the specific Showing event. */
    showing: IDStringSchema,

    /** Total ticket quantity; must be at least 1. */
    ticketCount: PositiveNumberSchema,

    /** Final monetary amount charged. */
    pricePaid: NonNegativeNumberSchema,

    /** 3-letter currency code (e.g., USD, GBP). */
    currency: ISO4217CurrencyCodeEnumSchema,

    /** Timestamp of the initial booking. */
    dateReserved: UTCISO8601StringSchema,

    /** Optional timestamp recorded upon successful payment. */
    datePaid: UTCISO8601StringSchema.optional(),

    /** Optional timestamp recorded upon manual cancellation. */
    dateCancelled: UTCISO8601StringSchema.optional(),

    /** Optional timestamp recorded upon refund issuance. */
    dateRefunded: UTCISO8601StringSchema.optional(),

    /** Optional timestamp recorded upon automatic TTL expiration. */
    dateExpired: UTCISO8601StringSchema.optional(),

    /** The calculated deadline for finalizing payment. */
    expiresAt: UTCISO8601StringSchema,

    /** Booking category (GA vs Reserved Seating). */
    reservationType: ReservationTypeEnumSchema,

    /** Current transactional status (Pending, Paid, etc.). */
    status: ReservationStatusEnumSchema,

    /** Administrative or user-provided notes; max 3000 chars. */
    notes: NonEmptyStringSchema
        .max(3000, "Must be 3000 characters or less.")
        .optional(),
});

/**
 * TypeScript type inferred from {@link ReservationBaseSchema}.
 */
export type ReservationBase = z.infer<typeof ReservationBaseSchema>;