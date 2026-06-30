/**
 * @fileoverview Defines the validation schema and type for user email addresses.
 */

import {StringValueSchema} from "@/common/_schemas";
import {z} from "zod";

/** Zod schema for validating and transforming user email strings. */
export const UserEmailSchema = StringValueSchema
    .email()
    .max(255, "Max. 255 Characters");

/** Type representing a validated user email string. */
export type UserEmail = z.infer<typeof UserEmailSchema>;