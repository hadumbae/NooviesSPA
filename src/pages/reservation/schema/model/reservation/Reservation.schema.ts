/**
 * @file Reservation.schema.ts
 *
 * @summary
 * Zod schemas for validating movie reservations.
 *
 * @description
 * Provides:
 * - Base reservation schema with identifier references
 * - Discriminated reservation variants by `reservationType`
 * - Cross-field lifecycle validation via {@link superRefineReservation}
 *
 * The schemas enforce consistency between reservation status and
 * required lifecycle dates (paid, cancelled, refunded, expired),
 * while allowing reservation-type–specific seating rules.
 */

import {z} from "zod";

import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import {superRefineReservation} from "@/pages/reservation/schema/model/reservation/Reservation.utils.ts";
import {ReservationTypeConstant} from "@/pages/reservation/constants/ReservationTypeConstant.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {ISO4217CurrencyCodeEnumSchema} from "@/common/schema/enums/ISO4217CurrencyCodeEnumSchema.ts";
import {ReservationTypeEnumSchema} from "@/pages/reservation/schema/enum/ReservationTypeEnumSchema.ts";
import {ReservationStatusEnumSchema} from "@/pages/reservation/schema/enum/ReservationStatusEnumSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {UTCISO8601StringSchema} from "@/common/schema/date-time/iso-8601/UTCISO8601StringSchema.ts";

/**
 * Base reservation schema.
 *
 * @remarks
 * Uses ObjectId references for related entities and defines all
 * lifecycle date fields as optional at the schema level.
 * Cross-field requirements are enforced via refinement.
 */
export const ReservationBaseSchema = z.object({
    user: IDStringSchema,
    showing: IDStringSchema,
    ticketCount: PositiveNumberSchema,
    pricePaid: NonNegativeNumberSchema,
    currency: ISO4217CurrencyCodeEnumSchema,
    dateReserved: UTCISO8601StringSchema,
    datePaid: UTCISO8601StringSchema.optional(),
    dateCancelled: UTCISO8601StringSchema.optional(),
    dateRefunded: UTCISO8601StringSchema.optional(),
    dateExpired: UTCISO8601StringSchema.optional(),
    expiresAt: UTCISO8601StringSchema,
    reservationType: ReservationTypeEnumSchema,
    status: ReservationStatusEnumSchema,
    notes: NonEmptyStringSchema
        .max(3000, "Must be 3000 characters or less.")
        .optional(),
});

/**
 * General admission reservation schema.
 *
 * @remarks
 * Disallows seat selection.
 */
const GeneralSchemaOption = ReservationBaseSchema.extend({
    reservationType: z.literal(ReservationTypeConstant[0]),
    selectedSeating: z.union([z.null(), z.undefined()]),
});

/**
 * Reserved seating reservation schema.
 *
 * @remarks
 * Requires an explicit list of selected seat IDs.
 */
const SeatingSchemaOption = ReservationBaseSchema.extend({
    reservationType: z.literal(ReservationTypeConstant[1]),
    selectedSeating: generateArraySchema(IDStringSchema),
});

/**
 * Validated reservation schema.
 *
 * @remarks
 * Discriminates by `reservationType` and applies lifecycle-based
 * cross-field validation.
 */
export const ReservationSchema = z
    .discriminatedUnion("reservationType", [GeneralSchemaOption, SeatingSchemaOption,])
    .superRefine(superRefineReservation);
