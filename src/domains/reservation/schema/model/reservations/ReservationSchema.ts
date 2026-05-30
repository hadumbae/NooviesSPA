/**
 * @fileoverview Discriminated union schema for reservation variants.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {generateArraySchema} from "@/common/_feat/validation-builders";
import {superRefineReservation} from "@/domains/reservation/schema/model/reservations/ReservationSchemaUtilities.ts";
import {ReservationTypeConstant} from "@/domains/reservation/schema/model/fields/ReservationTypeConstant.ts";
import {ReservationBaseSchema} from "@/domains/reservation/schema/model/reservations/ReservationBaseSchema.ts";

const GeneralSchemaOption = ReservationBaseSchema.extend({
    reservationType: z.literal(ReservationTypeConstant[0]),
    selectedSeating: z.union([z.null(), z.undefined()]),
});

const SeatingSchemaOption = ReservationBaseSchema.extend({
    reservationType: z.literal(ReservationTypeConstant[1]),
    selectedSeating: generateArraySchema(IDStringSchema),
});

/**
 * Validated reservation schema that discriminates between general admission and reserved seating.
 */
export const ReservationSchema = z
    .discriminatedUnion("reservationType", [GeneralSchemaOption, SeatingSchemaOption])
    .superRefine(superRefineReservation);

/** Inferred type representing a valid Reservation document. */
export type Reservation = z.infer<typeof ReservationSchema>;