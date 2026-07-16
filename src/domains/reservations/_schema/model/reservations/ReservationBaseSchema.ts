/**
 * @fileoverview Foundational Zod schema and type for Reservation entity validation.
 *
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/_schemas";
import {SlugStringSchema} from "@/common/_schemas/strings/slug-strings/SlugString.ts";
import {ISO4217CurrencyCodeSchema} from "@/common/_schemas/enums/ISO4217CurrencyCodeSchema.ts";
import {ReservationTypeEnumSchema} from "@/domains/reservations/_schema/model/fields/ReservationTypeEnumSchema.ts";
import {ReservationStatusEnumSchema} from "@/domains/reservations/_schema/model/fields/ReservationStatusEnumSchema.ts";
import {NonEmptyStringSchema} from "@/common/_schemas";
import {
    ReservationUniqueCodeSchema
} from "@/domains/reservations/_schema/model/fields/ReservationUniqueCodeSchema.ts";
import {ModelTimestampsSchema} from "@/common/_schemas/models/time-stamps/ModelTimestampsSchema.ts";
import {ISO8601DateTimeSchema} from "@/common/_schemas/iso-8601/ISO8601DateTimeSchema.ts";
import {ReservedShowingSnapshotSchema} from "@/domains/reservations/_schema/snapshot/ReservedShowingSnapshotSchema.ts";
import {BooleanValueSchema} from "@/common/_schemas/boolean/BooleanValueSchema.ts";
import {NonNegativeNumberSchema} from "@/common/_schemas/numbers/non-negative-number/NonNegativeNumberSchema";
import {PositiveNumberSchema} from "@/common/_schemas/numbers/positive-number/PositiveNumberSchema";

/** Zod schema for the temporal lifecycle and deadlines of a reservation. */
const ReservationBaseDateSchema = z.object({
    dateReserved: ISO8601DateTimeSchema,
    datePaid: ISO8601DateTimeSchema.optional(),
    dateCancelled: ISO8601DateTimeSchema.optional(),
    dateRefunded: ISO8601DateTimeSchema.optional(),
    dateExpired: ISO8601DateTimeSchema.optional(),
    expiresAt: ISO8601DateTimeSchema,
});

/** Zod schema for financial and quantity data associated with a reservation. */
const ReservationBasePaymentSchema = z.object({
    ticketCount: PositiveNumberSchema,
    pricePaid: NonNegativeNumberSchema,
    currency: ISO4217CurrencyCodeSchema,
    isPaid: BooleanValueSchema,
});

/** Zod schema for relational references and immutable data snapshots. */
const ReservationBaseRelatedSchema = z.object({
    user: IDStringSchema,
    showing: IDStringSchema,
    snapshot: ReservedShowingSnapshotSchema,
});

/** Zod schema for identification and administrative metadata. */
const ReservationBaseMetaSchema = z.object({
    _id: IDStringSchema.readonly(),
    slug: SlugStringSchema.readonly(),
    uniqueCode: ReservationUniqueCodeSchema.readonly(),
    reservationType: ReservationTypeEnumSchema,
    status: ReservationStatusEnumSchema,
    notes: NonEmptyStringSchema
        .max(3000, "Must be 3000 characters or less.")
        .optional()
        .nullable(),
});

/** Core validation schema defining the comprehensive structure of a Reservation record. */
export const ReservationBaseSchema = ModelTimestampsSchema.extend({
    ...ReservationBaseDateSchema.shape,
    ...ReservationBasePaymentSchema.shape,
    ...ReservationBaseRelatedSchema.shape,
    ...ReservationBaseMetaSchema.shape,
});

/** Base interface for all reservation-related data structures. */
export type ReservationBase = z.infer<typeof ReservationBaseSchema>;