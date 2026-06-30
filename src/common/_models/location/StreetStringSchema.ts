/**
 * @fileoverview Zod schema and TypeScript type for validating street address strings.
 */

import {NonEmptyStringSchema} from "@/common/_schemas";
import {z} from "zod";

/** Zod schema for validating a street address. */
export const StreetStringSchema = NonEmptyStringSchema.max(2000, {message: "Must be 2000 characters or less."});

/** TypeScript type for a valid street address. */
export type StreetString = z.infer<typeof StreetStringSchema>;