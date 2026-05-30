/**
 * @fileoverview Base schema for reservations with populated relational data.
 */

import {ReservationBaseSchema} from "@/domains/reservation/schema/model/reservations/ReservationBaseSchema.ts";
import {PopulatedShowingSchema} from "@/domains/showings/schema/showing/PopulatedShowingSchema.ts";
import {z} from "zod";

/** Base populated reservation schema that transforms the showing field into a fully resolved object. */
export const PopulatedReservationBaseSchema = ReservationBaseSchema.extend({
    showing: PopulatedShowingSchema,
});

/** TypeScript type representing the raw populated reservation structure. */
export type PopulatedReservationBase = z.infer<typeof PopulatedReservationBaseSchema>;