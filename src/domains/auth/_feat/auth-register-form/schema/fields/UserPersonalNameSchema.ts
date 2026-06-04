/**
 * @fileoverview Zod schema and type definition for a user's personal name field.
 */

import {StringValueSchema} from "@/common/schema/strings/simple-strings/StringValueSchema.ts";
import {z} from "zod";

/** Validation schema for a user's personal name requiring a specific length range. */
export const UserPersonalNameSchema = StringValueSchema
    .trim()
    .min(3, "Min. 3 Characters")
    .max(255, "Max. 255 Characters");

/** Type inferred from the UserPersonalNameSchema. */
export type UserPersonalName = z.infer<typeof UserPersonalNameSchema>;