/**
 * @fileoverview Zod enum schema for validating reservation status values.
 */

import {
    ReservationStatusConstant
} from "@/domains/reservations/_schema/model/fields/ReservationStatusConstant.ts";
import {z} from "zod";

/**
 * Zod schema for validating reservation status strings against allowed constants.
 */
export const ReservationStatusEnumSchema = z.enum(
    ReservationStatusConstant,
    {
        required_error: "Required.",
        invalid_type_error: `Invalid value. Must be: ${ReservationStatusConstant.join(", ")}`,
    }
);

/**
 * Type inferred from the ReservationStatusEnumSchema.
 */
export type ReservationStatus =
    z.infer<typeof ReservationStatusEnumSchema>;
