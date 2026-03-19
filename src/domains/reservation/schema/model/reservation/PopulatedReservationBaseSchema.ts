/**
 * @file Base schema for reservations with populated relational data.
 * @filename PopulatedReservationBaseSchema.ts
 */

import {ReservationBaseSchema} from "@/domains/reservation/schema/model/reservation/ReservationBaseSchema.ts";
import {PopulatedShowingSchema} from "@/domains/showings/schema/showing/PopulatedShowingSchema.ts";
import {z} from "zod";

/**
 * Base populated reservation schema.
 * * @remarks
 * Inherits core fields from {@link ReservationBaseSchema} and transforms the `showing`
 * field from a simple identifier into a fully resolved {@link PopulatedShowingSchema}.
 * This serves as the foundation for {@link PopulatedReservationSchema}.
 */
export const PopulatedReservationBaseSchema = ReservationBaseSchema.extend({
    /** Resolved showing details including movie, theatre, and screen metadata. */
    showing: PopulatedShowingSchema,
});

/**
 * TypeScript type inferred from {@link PopulatedReservationBaseSchema}.
 * * @remarks
 * Represents the raw populated structure. Note that this type does not yet
 * include the status-based refinements applied in the final union.
 */
export type ReservationDetailsBase = z.infer<typeof PopulatedReservationBaseSchema>;