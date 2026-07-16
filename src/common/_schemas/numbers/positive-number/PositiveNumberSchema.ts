/**
 * @fileoverview Zod schema for validating positive numbers.
 */

import {z} from "zod";

/** Zod schema for validating positive numbers. */
export const PositiveNumberSchema = z
    .number({required_error: "Required.", invalid_type_error: "Must be a number."})
    .positive({message: "Must be a positive number."});

/** Type definition for a positive number. */
export type PositiveNumber = z.infer<typeof PositiveNumberSchema>;