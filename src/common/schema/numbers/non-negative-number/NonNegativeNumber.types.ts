import {z} from "zod";
import {
    CleanedNonNegativeNumberSchema,
    NonNegativeNumberSchema
} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";

/**
 * The type representing a non-negative number validated directly by Zod.
 *
 * Corresponds to values validated by `NonNegativeNumberSchema`, which:
 * - Must be a number type (no coercion)
 * - Must be greater than or equal to zero
 */
export type NonNegativeNumber = z.infer<typeof NonNegativeNumberSchema>;

/**
 * The type representing a non-negative number that may be coerced or preprocessed.
 *
 * Corresponds to values validated by `CleanedNonNegativeNumberSchema`, which:
 * - Accepts unknown or string input that is coerced to number
 * - Ensures the number is non-negative
 * - Useful for cleaned or user input values that need preprocessing
 */
export type CleanedNonNegativeNumber = z.infer<typeof CleanedNonNegativeNumberSchema>;