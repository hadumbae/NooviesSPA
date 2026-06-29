/**
 * @fileoverview Defines the schema and type for a lean user including email contact information.
 */

import {z} from "zod";
import {LeanUserSchema} from "@/domains/users/_schema/user/LeanUserSchema.ts";
import {EmailStringSchema} from "@/common/schema/strings/EmailStringSchema.ts";

/** Zod schema for a lean user profile extended with an email address. */
export const LeanUserWithEmailSchema = LeanUserSchema.extend({
    email: EmailStringSchema,
});

/**
 * Lean user profile including email contact information.
 */
export type LeanUserWithEmail = z.infer<typeof LeanUserWithEmailSchema>;