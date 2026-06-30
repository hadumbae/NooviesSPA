/**
 * @fileoverview Zod schema and type for validating empty string literals.
 */

import {z} from "zod";

/** A Zod schema that validates an empty string literal. */
export const EmptyStringSchema = z.literal("", {
    message: "Invalid",
    required_error: "Required",
    invalid_type_error: "Must Be An Empty String",
});

/** A TypeScript type representing the literal empty string. */
export type EmptyString = z.infer<typeof EmptyStringSchema>;