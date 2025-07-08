import {z} from "zod";
import {
    CleanedPositiveNumberSchema,
    CoercedPositiveNumberSchema,
    PositiveNumberSchema
} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";

/**
 * Type representing a required positive number.
 * Inferred from {@link PositiveNumberSchema}.
 */
export type PositiveNumber = z.infer<typeof PositiveNumberSchema>;

/**
 * Type representing a required positive number,
 * where the input is first coerced into a number before validation.
 * Inferred from {@link CoercedPositiveNumberSchema}.
 */
export type CoercedPositiveNumber = z.infer<typeof CoercedPositiveNumberSchema>;

/**
 * Type representing a required positive number,
 * where the input is preprocessed by attempting to convert it to a number,
 * with invalid inputs replaced by `undefined` to trigger validation errors.
 * Inferred from {@link CleanedPositiveNumberSchema}.
 */
export type CleanedPositiveNumber = z.infer<typeof CleanedPositiveNumberSchema>;