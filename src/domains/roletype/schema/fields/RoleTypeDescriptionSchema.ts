/**
 * @fileoverview Defines the validation schema and type for role type descriptions.
 */

import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {z} from "zod";

/** Zod schema for validating an optional role type description string. */
export const RoleTypeDescriptionSchema = NonEmptyStringSchema
    .max(1000, {message: "Max. 1000 Characters"})
    .optional();

/** Type definition for a role type description. */
export type RoleTypeDescription = z.infer<typeof RoleTypeDescriptionSchema>;