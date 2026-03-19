/**
 * @file Base schema and type for reservation records.
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

/**
 * Core {@link z.object} defining the reservation data structure.
 * Uses {@link IDStringSchema} for entity references.
 */
export const ReservationBaseSchema = z.object({
    /** {@link IDStringSchema} */
    _id: IDStringSchema,

    /** {@link SlugStringSchema} */
    slug: SlugStringSchema,

    /** Reference via {@link IDStringSchema}. */
    user: IDStringSchema,

    /** Reference via {@link IDStringSchema}. */
    showing: IDStringSchema,

    /** {@link PositiveNumberSchema} */
    ticketCount: PositiveNumberSchema,

    /** {@link NonNegativeNumberSchema} */
    pricePaid: NonNegativeNumberSchema,

    /** {@link ISO4217CurrencyCodeEnumSchema} */
    currency: ISO4217CurrencyCodeEnumSchema,

    /** {@link UTCISO8601StringSchema} */
    dateReserved: UTCISO8601StringSchema,

    /** Optional {@link UTCISO8601StringSchema}. */
    datePaid: UTCISO8601StringSchema.optional(),

    /** Optional {@link UTCISO8601StringSchema}. */
    dateCancelled: UTCISO8601StringSchema.optional(),

    /** Optional {@link UTCISO8601StringSchema}. */
    dateRefunded: UTCISO8601StringSchema.optional(),

    /** Optional {@link UTCISO8601StringSchema}. */
    dateExpired: UTCISO8601StringSchema.optional(),

    /** TTL timestamp via {@link UTCISO8601StringSchema}. */
    expiresAt: UTCISO8601StringSchema,

    /** {@link ReservationTypeEnumSchema} */
    reservationType: ReservationTypeEnumSchema,

    /** {@link ReservationStatusEnumSchema} */
    status: ReservationStatusEnumSchema,

    /** {@link NonEmptyStringSchema} capped at 3000 chars. */
    notes: NonEmptyStringSchema
        .max(3000, "Must be 3000 characters or less.")
        .optional(),
});

/**
 * Inferred type from {@link ReservationBaseSchema}.
 */
export type ReservationBase = z.infer<typeof ReservationBaseSchema>;
