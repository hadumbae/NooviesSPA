/**
 * @file Discriminated union schema for administrative reservation records.
 * @filename AdminReservationSchema.ts
 */

import {superRefineReservation} from "@/domains/reservation/schema/model/ReservationSchemaUtilities.ts";
import {z} from "zod";
import {ReservationTypeConstant} from "@/domains/reservation/constants/ReservationTypeConstant.ts";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {AdminReservationBaseSchema} from "@/domains/reservation/schema/model/AdminReservationBaseSchema.ts";

/**
 * Variant for General Admission bookings where specific seats are not tracked.
 */
const GeneralSchemaOption = AdminReservationBaseSchema.extend({
    /** Explicitly restricted to the "GENERAL_ADMISSION" literal. */
    reservationType: z.literal(ReservationTypeConstant[0]),
    /** Enforces that no seating data is present for this type. */
    selectedSeating: z.union([z.null(), z.undefined()]),
});

/**
 * Variant for Reserved Seating bookings requiring specific seat identifiers.
 */
const SeatingSchemaOption = AdminReservationBaseSchema.extend({
    /** Explicitly restricted to the "RESERVED_SEATS" literal. */
    reservationType: z.literal(ReservationTypeConstant[1]),
    /** Enforces a list of {@link IDStringSchema} representing specific seats. */
    selectedSeating: generateArraySchema(IDStringSchema),
});

/**
 * Validated Administrative Reservation schema using a discriminated union.
 */
export const AdminReservationSchema = z
    .discriminatedUnion("reservationType", [GeneralSchemaOption, SeatingSchemaOption])
    .superRefine(superRefineReservation);

/**
 * TypeScript type inferred from {@link AdminReservationSchema}.
 */
export type AdminReservation = z.infer<typeof AdminReservationSchema>;