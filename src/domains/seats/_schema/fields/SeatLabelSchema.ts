/**
 * @fileoverview Zod schema and type definition for seat labels.
 */

import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {z} from "zod";

/** Zod schema for validating a seat label string. */
export const SeatLabelSchema = NonEmptyStringSchema.max(25, "Must be 25 characters or less.");

/** Type definition for a seat label. */
export type SeatLabel = z.infer<typeof SeatLabelSchema>;