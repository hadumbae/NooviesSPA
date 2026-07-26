/**
 * @fileoverview Discriminated union schema for administrative reservation records.
 *
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/_schemas/strings";
import {generateArraySchema} from "@/common/_feat/validation-builders";
import {ReservationTypeConstant} from "@/domains/reservations/_schema/model/fields";
import {superRefineReservation} from "@/domains/reservations/_schema/model/reservations";
import {
    AdminReservationBaseSchema
} from "@/domains/reservations/_schema/model/admin-reservations/AdminReservationBaseSchema.ts";

/**
 * Variant for General Admission bookings where specific seats are not tracked.
 */
const GeneralSchemaOption = AdminReservationBaseSchema.extend({
    reservationType: z.literal(ReservationTypeConstant[0]),
    selectedSeating: z.union([z.null(), z.undefined()]),
});

/**
 * Variant for Reserved Seating bookings requiring specific seat identifiers.
 */
const SeatingSchemaOption = AdminReservationBaseSchema.extend({
    reservationType: z.literal(ReservationTypeConstant[1]),
    selectedSeating: generateArraySchema(IDStringSchema),
});

/**
 * Discriminated union schema for validating administrative reservation records.
 */
export const AdminReservationSchema = z
    .discriminatedUnion("reservationType", [GeneralSchemaOption, SeatingSchemaOption])
    .superRefine(superRefineReservation);

/** Administrative reservation record type. */
export type AdminReservation = z.infer<typeof AdminReservationSchema>;