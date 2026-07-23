/**
 * @fileoverview Defines the schema and type for a lean user including email contact information.
 */

import {z} from "zod";
import {LeanUserSchema} from "@/domains/users/_schema/user/LeanUserSchema.ts";
import {UserEmailSchema} from "@/domains/auth";

/** Zod schema for a lean user profile extended with an email address. */
export const LeanUserWithEmailSchema = LeanUserSchema.extend({
    email: UserEmailSchema,
});

/**
 * Lean user profile including email contact information.
 */
export type LeanUserWithEmail = z.infer<typeof LeanUserWithEmailSchema>;