import {format, isValid, parse} from "date-fns";
import {z} from "zod";

/**
 * Validates and normalizes a date string in `yyyy-MM-dd` format.
 *
 * - Ensures the input is a string.
 * - Checks that it represents a valid date.
 * - Returns the date string normalized to `yyyy-MM-dd`.
 *
 * Example:
 * ```ts
 * CoercedDateStringSchema.parse("2025-08-20"); // "2025-08-20"
 * CoercedDateStringSchema.parse("2025-8-5");   // throws ZodError
 * ```
 */
export const CoercedDateStringSchema = z
    .string({ message: "Required", invalid_type_error: "Must be a valid date string." })
    .refine(
        (val) => isValid(parse(val, "yyyy-MM-dd", new Date())),
        { message: "Must be a valid date in the yyyy-MM-dd format." }
    )
    .transform((val) => {
        const parsed = parse(val, "yyyy-MM-dd", new Date());
        return format(parsed, "yyyy-MM-dd");
    });