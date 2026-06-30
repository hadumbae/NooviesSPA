/**
 * @fileoverview Zod schema and type definition for a person's name.
 */

import {NonEmptyStringSchema} from "@/common/_schemas";
import {z} from "zod";

/** Zod schema for validating a person's name string. */
export const PersonNameSchema = NonEmptyStringSchema.max(255, "Max. 255 Chars");

/** TypeScript type for a person's name inferred from PersonNameSchema. */
export type PersonName = z.infer<typeof PersonNameSchema>;