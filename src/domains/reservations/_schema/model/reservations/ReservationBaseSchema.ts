/**
 * @fileoverview Foundational Zod schema and type for Reservation entity validation.
 *
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {SlugStringSchema} from "@/common/schema/strings/simple-strings/SlugString.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {ISO4217CurrencyCodeEnumSchema} from "@/common/schema/enums/ISO4217CurrencyCodeEnumSchema.ts";
import {ReservationTypeEnumSchema} from "@/domains/reservations/_schema/model/fields/ReservationTypeEnumSchema.ts";
import {ReservationStatusEnumSchema} from "@/domains/reservations/_schema/model/fields/ReservationStatusEnumSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {
    ReservationUniqueCodeSchema
} from "@/domains/reservations/_schema/model/fields/ReservationUniqueCodeSchema.ts";
import {ModelTimestampsSchema} from "@/common/schema/models/ModelTimestampsSchema.ts";
import {UTCISO8601DateTimeSchema} from "@/common/schema/date-time/iso-8601/UTCISO8601DateTimeSchema.ts";
import {ReservedShowingSnapshotSchema} from "@/domains/reservations/_schema/snapshot/ReservedShowingSnapshotSchema.ts";
import {BooleanValueSchema} from "@/common/schema/boolean/BooleanValueSchema.ts";

/** Zod schema for the temporal lifecycle and deadlines of a reservation. */
const ReservationBaseDateSchema = z.object({
    dateReserved: UTCISO8601DateTimeSchema,
    datePaid: UTCISO8601DateTimeSchema.optional(),
    dateCancelled: UTCISO8601DateTimeSchema.optional(),
    dateRefunded: UTCISO8601DateTimeSchema.optional(),
    dateExpired: UTCISO8601DateTimeSchema.optional(),
    expiresAt: UTCISO8601DateTimeSchema,
});

/** Zod schema for financial and quantity data associated with a reservation. */
const ReservationBasePaymentSchema = z.object({
    ticketCount: PositiveNumberSchema,
    pricePaid: NonNegativeNumberSchema,
    currency: ISO4217CurrencyCodeEnumSchema,
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