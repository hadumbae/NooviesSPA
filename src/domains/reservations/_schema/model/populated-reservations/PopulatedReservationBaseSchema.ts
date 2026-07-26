/**
 * @fileoverview Base schema for reservations with populated relational data.
 */

import {z} from "zod";
import {PopulatedShowingSchema} from "@/domains/showings/_schema/showing/PopulatedShowingSchema.ts";
import {ReservationBaseSchema} from "@/domains/reservations/_schema/model/reservations/ReservationBaseSchema.ts";

/** Base populated reservation schema that transforms the showing field into a fully resolved object. */
export const PopulatedReservationBaseSchema = ReservationBaseSchema.extend({
    showing: z.lazy(() => PopulatedShowingSchema),
});

/** TypeScript type representing the raw populated reservation structure. */
export type PopulatedReservationBase = z.infer<typeof PopulatedReservationBaseSchema>;