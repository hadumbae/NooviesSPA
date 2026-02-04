/**
 * @file ReserveTicketFormSchema.ts
 *
 * @summary
 * Zod schemas for validating ticket reservation form submissions.
 *
 * @description
 * Defines client-facing validation rules for ticket reservation checkout,
 * supporting both:
 * - General admission reservations (no seat selection)
 * - Reserved seating reservations (explicit seat selection)
 *
 * The schemas enforce structural correctness and reservation-mode
 * constraints prior to reservation creation.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {CoercedPositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {ISO4217CurrencyCodeEnumSchema} from "@/common/schema/enums/ISO4217CurrencyCodeEnumSchema.ts";
import {ReservationTypeConstant} from "@/pages/reservation/constants/ReservationTypeConstant.ts";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";

/**
 * Base schema for ticket reservation form submissions.
 *
 * @remarks
 * Shared fields independent of reservation mode.
 */
export const ReserveTicketFormBaseSchema = z.object({
    /** Showing being reserved. */
    showing: IDStringSchema,

    /** Number of tickets included in the checkout. */
    ticketCount: preprocessEmptyStringToUndefined(CoercedPositiveNumberSchema),

    /** Currency used for pricing (ISO 4217). */
    currency: ISO4217CurrencyCodeEnumSchema,
});

/**
 * Form schema for general admission reservations.
 *
 * @remarks
 * Seat selection is not permitted and must be empty or omitted.
 */
export const ReserveTicketGeneralAdmissionFormSchema =
    ReserveTicketFormBaseSchema.extend({
        reservationType: z.literal(ReservationTypeConstant[0]),
        selectedSeating: z
            .array(z.any())
            .length(0, {message: "Must be empty."})
            .nullable()
            .optional(),
    });

/**
 * Form schema for reserved seating reservations.
 *
 * @remarks
 * Requires explicit seat selection and enforces a non-empty array
 * of seat identifiers.
 */
export const ReserveTicketReservedSeatingFormSchema =
    ReserveTicketFormBaseSchema.extend({
        reservationType: z.literal(ReservationTypeConstant[1]),
        selectedSeating: generateArraySchema(IDStringSchema)
            .min(1, {message: "Must not be an empty array."}),
    });

/**
 * Discriminated union schema for ticket reservation form submissions.
 *
 * @remarks
 * Branches validation logic based on `reservationType` to enforce
 * seat selection rules appropriate to the reservation mode.
 */
export const ReserveTicketFormSchema = z.discriminatedUnion(
    "reservationType",
    [
        ReserveTicketGeneralAdmissionFormSchema,
        ReserveTicketReservedSeatingFormSchema,
    ],
);

/**
 * Strongly typed reservation form submission.
 *
 * @remarks
 * Inferred directly from {@link ReserveTicketFormSchema}.
 */
export type ReserveTicketForm = z.infer<typeof ReserveTicketFormSchema>;
