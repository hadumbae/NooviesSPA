/**
 * @fileoverview Zod schema and type definition for time strings in 24-hour format.
 */

import { z } from "zod";

/** Zod schema that validates a string matches the hh:mm time format. */
export const TimeStringSchema = z
    .string({ required_error: "Required.", invalid_type_error: "Time must be a string." })
    .regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, "Time must be in hh:mm format.");

/** Type representing a validated time string. */
export type TimeString = z.infer<typeof TimeStringSchema>;
