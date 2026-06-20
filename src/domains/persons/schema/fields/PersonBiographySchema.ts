/**
 * @fileoverview Zod schema and type definition for a person's biography field.
 */

import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {z} from "zod";

/** Zod schema for validating a person's biography string. */
export const PersonBiographySchema = NonEmptyStringSchema.max(1000, "Max. 1000 Chars");

/** Type inferred from the PersonBiographySchema. */
export type PersonBiography = z.infer<typeof PersonBiographySchema>;