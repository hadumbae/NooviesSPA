/**
 * @fileoverview Zod enum schema and type definition for reservation types.
 */

import {z} from "zod";
import {ReservationTypeConstant} from "@/domains/reservations/_schema/model/fields/ReservationTypeConstant.ts";

/**
 * Zod schema for validating reservation type strings against allowed constants.
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

/** TypeScript type inferred from the reservation type enum schema. */
export type ReservationType = z.infer<typeof ReservationTypeEnumSchema>;
