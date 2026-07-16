/**
 * @fileoverview Zod schema for validating email strings.
 */

import {z} from 'zod';
import {StringValueSchema} from "@/common/_schemas/strings/simple-strings/StringValueSchema.ts";

/** Zod schema that validates a string as a valid email address. */
export const EmailStringSchema = StringValueSchema.email({message: "Must be an email address."});

/** Type representing a validated email string. */
export type EmailString = z.infer<typeof EmailStringSchema>;