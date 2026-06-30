/**
 * @fileoverview Zod schema for seat row identifiers.
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/_schemas";

/** Zod schema for validating a seat row string. */
export const SeatRowSchema = NonEmptyStringSchema.max(10, "Must be 10 characters or less.");

/** Type representing a seat row identifier. */
export type SeatRow = z.infer<typeof SeatRowSchema>;