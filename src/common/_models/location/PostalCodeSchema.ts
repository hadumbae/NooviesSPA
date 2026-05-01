/**
 * @fileoverview Zod schema and TypeScript type for validating postal codes.
 */

import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {z} from "zod";

/** Zod schema for validating a postal code. */
export const PostalCodeSchema = NonEmptyStringSchema.max(25, {message: "Must be 25 characters or less."});

/** TypeScript type for a valid postal code. */
export type PostalCode = z.infer<typeof PostalCodeSchema>;