/**
 * @file ReservationTypeEnumSchema.ts
 *
 * Zod enum schema for reservation types.
 *
 * Provides runtime validation and type inference
 * for reservation mode values used across
 * checkout, reservation, and seating workflows.
 */

import {z} from "zod";
import {ReservationTypeConstant} from "@/pages/reservation/constants/ReservationTypeConstant.ts";

/**
 * Reservation type enum schema.
 *
 * @remarks
 * - Backed by {@link ReservationTypeConstant} as the
 *   single source of truth
 * - Produces user-friendly validation errors
 * - Intended for request validation and domain safety
 */
export const ReservationTypeEnumSchema = z.enum(
    ReservationTypeConstant,
    {
        errorMap: (issue, ctx) => {
            if (issue.code === z.ZodIssueCode.invalid_enum_value) return {message: "Invalid value."};
            if (issue.code === z.ZodIssueCode.invalid_type) return {message: "Must be a valid string."};
            return {message: ctx.defaultError};
        },
    }
);

/**
 * Reservation type literal union.
 *
 * Derived from {@link ReservationTypeEnumSchema}
 * to ensure compile-time and runtime consistency.
 */
export type ReservationType = z.infer<typeof ReservationTypeEnumSchema>;
