/**
 * @fileoverview Zod schema and type definition for theatre names.
 */

import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {z} from "zod";

/** Schema for validating a theatre name string. */
export const TheatreNameSchema = NonEmptyStringSchema.max(255, "Must be 255 characters or less.");

/** Type inferred from the TheatreNameSchema. */
export type TheatreName = z.infer<typeof TheatreNameSchema>;