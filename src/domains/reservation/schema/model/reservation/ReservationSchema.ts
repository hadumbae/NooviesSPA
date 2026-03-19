/**
 * @file Discriminated union schema for reservation variants.
 * @filename ReservationSchema.ts
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import {superRefineReservation} from "@/domains/reservation/schema/model/reservation/ReservationSchemaUtilities.ts";
import {ReservationTypeConstant} from "@/domains/reservation/constants/ReservationTypeConstant.ts";
import {ReservationBaseSchema} from "@/domains/reservation/schema/model/reservation/ReservationBaseSchema.ts";

/**
 * Schema for General Admission (GA) reservations.
 * * @remarks
 * Extends {@link ReservationBaseSchema} and enforces that `selectedSeating`
 * remains empty as GA logic relies on capacity rather than specific seat IDs.
 */
const GeneralSchemaOption = ReservationBaseSchema.extend({
    /** Matches the GA identifier in {@link ReservationTypeConstant}. */
    reservationType: z.literal(ReservationTypeConstant[0]),

    /** Explicitly restricted to `null` or `undefined` for GA. */
    selectedSeating: z.union([z.null(), z.undefined()]),
});

/**
 * Schema for Reserved Seating reservations.
 * * @remarks
 * Extends {@link ReservationBaseSchema} and requires a non-empty array of
 * specific Seat ObjectIDs.
 */
const SeatingSchemaOption = ReservationBaseSchema.extend({
    /** Matches the Reserved identifier in {@link ReservationTypeConstant}. */
    reservationType: z.literal(ReservationTypeConstant[1]),

    /** Array of {@link IDStringSchema} via {@link generateArraySchema}. */
    selectedSeating: generateArraySchema(IDStringSchema),
});

/**
 * Final validated reservation schema.
 * * * **Discrimination:** Switches validation logic based on `reservationType`.
 * * **Refinement:** Applies {@link superRefineReservation} from {@link ReservationSchemaUtilities}
 * to validate logical constraints (e.g., expiry dates vs. current status).
 */
export const ReservationSchema = z
    .discriminatedUnion("reservationType", [GeneralSchemaOption, SeatingSchemaOption])
    .superRefine(superRefineReservation);

/**
 * Inferred type representing a valid Reservation document.
 */
export type Reservation = z.infer<typeof ReservationSchema>;