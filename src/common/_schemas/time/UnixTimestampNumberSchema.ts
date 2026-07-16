/**
 * @fileoverview Zod schema for validating Unix timestamp numbers.
 */

import {z} from "zod";

/** Zod schema for validating a number as a valid Unix timestamp. */
export const UnixTimestampNumberSchema = z
    .number({required_error: "Required.", invalid_type_error: "Must be a valid Unix timestamp number."})
    .int({message: "Must be an integer."})
    .nonnegative({message: "Must not be negative."})
    .gte(946684800, {message: "Timestamp is too old."})
    .lte(Math.floor(Date.now() / 1000) + 60, {message: "Timestamp seems to be in the future!"});

/** Type representing a validated Unix timestamp number. */
export type UnixTimestampNumber = z.infer<typeof UnixTimestampNumberSchema>;