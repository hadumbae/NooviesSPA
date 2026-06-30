/**
 * @fileoverview Defines the validation schema and type for user passwords.
 */

import {StringValueSchema} from "@/common/_schemas";
import {z} from "zod";

/** Zod schema for validating user password strength and length requirements. */
export const UserPasswordSchema = StringValueSchema
    .min(16, "Min. 16 Characters")
    .max(255, "Max. 255 Characters");

/** Type inferred from the UserPasswordSchema. */
export type UserPassword = z.infer<typeof UserPasswordSchema>;