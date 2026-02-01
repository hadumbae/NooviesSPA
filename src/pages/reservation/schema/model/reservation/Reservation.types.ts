/**
 * @file Reservation.types.ts
 *
 * @summary
 * TypeScript types inferred from reservation schemas.
 *
 * @description
 * Exposes strongly typed reservation representations derived
 * directly from Zod schemas to ensure runtime and compile-time
 * consistency.
 */

import {z} from "zod";

import {
    ReservationBaseSchema,
    ReservationSchema,
} from "@/pages/reservation/schema/model/reservation/Reservation.schema.ts";

/**
 * Base reservation type.
 *
 * @remarks
 * Represents a reservation with identifier references and
 * no enforced lifecycle guarantees beyond field shape.
 */
export type ReservationBase = z.infer<typeof ReservationBaseSchema>;

/**
 * Validated reservation type.
 *
 * @remarks
 * Represents a reservation that has passed discriminated
 * union checks and lifecycle-based refinement.
 */
export type Reservation = z.infer<typeof ReservationSchema>;
