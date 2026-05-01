/**
 * @fileoverview Zod schema and TypeScript type for validating state or province names.
 */

import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {z} from "zod";

/** Zod schema for validating a state or province name. */
export const StateStringSchema = NonEmptyStringSchema.max(500, {message: "Must be 500 characters or less."});

/** TypeScript type for a valid state or province name. */
export type StateString = z.infer<typeof StateStringSchema>;