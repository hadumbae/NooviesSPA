/**
 * @file Specialized Zod schema for Administrative Reservation records with expanded user data.
 * @filename AdminReservationBaseSchema.ts
 */

import {z} from "zod";
import {ReservationBaseSchema} from "@/domains/reservation/schema/model/ReservationBaseSchema.ts";
import {LeanUserWithEmailSchema} from "@/domains/users/schemas/user";

/**
 * Extension of the base reservation schema that replaces the raw user ID with a lean user object.
 */
export const AdminReservationBaseSchema = ReservationBaseSchema.extend({
    user: LeanUserWithEmailSchema,
});

/**
 * TypeScript type inferred from {@link AdminReservationBaseSchema}.
 */
export type AdminReservationBase = z.infer<typeof AdminReservationBaseSchema>;