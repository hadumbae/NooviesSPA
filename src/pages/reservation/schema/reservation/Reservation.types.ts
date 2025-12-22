/**
 * @file Reservation.types.ts
 *
 * @summary
 * TypeScript types inferred from reservation Zod schemas.
 *
 * @description
 * Provides strongly typed representations of:
 * - Base reservations (ID references only)
 * - Validated reservations with lifecycle constraints applied
 * - Fully populated reservation variants for API responses
 *
 * All types are derived directly from their corresponding Zod schemas
 * to ensure runtime and compile-time consistency.
 */

import { z } from "zod";

import {
    ReservationBaseSchema,
    ReservationDetailsBaseSchema,
    ReservationDetailsSchema,
    ReservationSchema,
} from "@/pages/reservation/schema/reservation/Reservation.schema.ts";

/**
 * @summary
 * Base reservation type.
 *
 * @description
 * Represents a reservation using identifier references for related entities,
 * without population or lifecycle validation guarantees.
 */
export type ReservationBase = z.infer<typeof ReservationBaseSchema>;

/**
 * @summary
 * Validated reservation type.
 *
 * @description
 * Represents a reservation that has passed all lifecycle and
 * cross-field validation rules.
 */
export type Reservation = z.infer<typeof ReservationSchema>;

/**
 * @summary
 * Base populated reservation type.
 *
 * @description
 * Extends the base reservation with populated user, showing,
 * and seating data, without lifecycle validation guarantees.
 */
export type ReservationDetailsBase =
    z.infer<typeof ReservationDetailsBaseSchema>;

/**
 * @summary
 * Fully populated, validated reservation type.
 *
 * @description
 * Represents a reservation with populated relations and
 * enforced lifecycle constraints.
 */
export type ReservationDetails =
    z.infer<typeof ReservationDetailsSchema>;
