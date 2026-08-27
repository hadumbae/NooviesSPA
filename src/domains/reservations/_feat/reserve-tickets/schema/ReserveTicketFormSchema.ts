/**
 * @fileoverview Zod schemas for validating ticket reservation form submissions and data structures.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/_schemas";
import {ISO4217CurrencyCodeSchema} from "@/common/_schemas/enums/ISO4217CurrencyCodeSchema.ts";
import {ReservationTypeConstant} from "@/domains/reservations/_schema/model/fields/ReservationTypeConstant.ts";
import {generateArraySchema} from "@/common/_feat/validation-builders";
import {preprocessEmptyToUndefined} from "@/common/_feat/validation-preprocessors";
import {AnyValues} from "@/common/_types";
import {CoercedPositiveNumberSchema} from "@/common/_schemas/numbers/positive-number/CoercedPositiveNumberSchema";
import {preprocessToNull} from "@/common/_feat/validation-preprocessors/preprocessToNull.ts";

/** Base schema containing shared fields for all ticket reservation modes. */
export const ReserveTicketFormBaseSchema = z.object({
    showing: IDStringSchema,
    movie: IDStringSchema,
    ticketCount: preprocessEmptyToUndefined(CoercedPositiveNumberSchema),
    currency: ISO4217CurrencyCodeSchema,
});

/** Form schema for general admission reservations where seat selection is prohibited. */
export const ReserveTicketGeneralAdmissionFormSchema = ReserveTicketFormBaseSchema.extend({
    reservationType: z.literal(ReservationTypeConstant[0]),
    selectedSeating: preprocessToNull(z.null()),
});

/** Form schema for reserved seating reservations requiring at least one selected seat. */
export const ReserveTicketReservedSeatingFormSchema = ReserveTicketFormBaseSchema.extend({
    reservationType: z.literal(ReservationTypeConstant[1]),
    selectedSeating: generateArraySchema(IDStringSchema).min(1, {message: "Must not be an empty array."}),
});

/** Discriminated union schema that branches validation logic based on the reservation type. */
export const ReserveTicketFormSchema = z.discriminatedUnion(
    "reservationType",
    [ReserveTicketGeneralAdmissionFormSchema, ReserveTicketReservedSeatingFormSchema],
);

/** Inferred type for ticket reservation form submissions. */
export type ReserveTicketFormData = z.infer<typeof ReserveTicketFormSchema>;

/** Strongly typed representation of reservation form values for use in form state. */
export type ReserveTicketFormValues = AnyValues<ReserveTicketFormData>;