import { z } from "zod";

/**
 * @file StringValueSchema.ts
 *
 * Zod schema for a normalized string value.
 *
 * - Ensures the input is a string
 * - Trims leading and trailing whitespace
 * - Throws a required error if missing
 */
export const StringValueSchema = z
    .string({
        required_error: "Required",
        invalid_type_error: "Must be a string.",
    })
    .trim();

/**
 * Inferred TypeScript type for {@link StringValueSchema}.
 */
export type StringValue = z.infer<typeof StringValueSchema>;
