/**
 * @fileoverview Zod schema for administrative reservation records with expanded user data.
 */

import {z} from "zod";
import {ReservationBaseSchema} from "@/domains/reservation/schema/model/reservations/ReservationBaseSchema.ts";
import {LeanUserWithEmailSchema} from "@/domains/users/schema/user";

/** Zod schema that extends the base reservation with a lean user object. */
export const AdminReservationBaseSchema = ReservationBaseSchema.extend({
    user: LeanUserWithEmailSchema,
});

/** Administrative reservation record with expanded user information. */
export type AdminReservationBase = z.infer<typeof AdminReservationBaseSchema>;