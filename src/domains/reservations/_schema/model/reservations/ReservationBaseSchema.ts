/**
 * @fileoverview Foundational Zod schema and type for Reservation entity validation.
 */

import {z} from "zod";
import {IDStringSchema, NonEmptyStringSchema, SlugStringSchema} from "@/common/_schemas/strings";
import {ISO4217CurrencyCodeSchema} from "@/common/_schemas/enums/ISO4217CurrencyCodeSchema.ts";
import {ModelTimestampsSchema} from "@/common/_schemas/models/time-stamps/ModelTimestampsSchema.ts";
import {ReservedShowingSnapshotSchema} from "@/domains/reservations/_schema/snapshot";
import {BooleanValueSchema} from "@/common/_schemas/boolean/BooleanValueSchema.ts";
import {ISO8601DateTimeSchema} from "@/common/_schemas/iso-8601/ISO8601DateTimeSchema.ts";
import {NonNegativeNumberSchema, PositiveNumberSchema} from "@/common/_schemas/numbers";
import {
    ReservationStatusEnumSchema,
    ReservationTypeEnumSchema,
    ReservationUniqueCodeSchema
} from "@/domains/reservations/_schema/model/fields";

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