import {z} from "zod";
import {format, isValid, parse} from "date-fns";

/**
 * Validates and normalizes a date string in `yyyy-MM-dd` format that is not in the future.
 *
 * - Ensures the input is a string.
 * - Checks that it represents a valid date.
 * - Ensures the date is today or in the past (not a future date).
 * - Returns the date string normalized to `yyyy-MM-dd`.
 *
 * Example:
 * ```ts
 * NonFutureDateStringSchema.parse("2025-08-20"); // "2025-08-20"
 * NonFutureDateStringSchema.parse("3000-01-01"); // throws ZodError
 * NonFutureDateStringSchema.parse("invalid");    // throws ZodError
 * ```
 */
export const NonFutureDateStringSchema = z
    .string({required_error: "Required.", invalid_type_error: "Must be a valid date string."})
    .refine(
        (dateString) => {
            const parsedDate = parse(dateString, "yyyy-MM-dd", new Date());
            return isValid(parsedDate) && (parsedDate <= new Date());
        },
        (dateString) => {
            if (dateString === "") return {message: "Required"};

            const parsedDate = parse(dateString, "yyyy-MM-dd", new Date());
            if (!isValid(parsedDate)) return {message: "Must be a valid date string in the `yyyy-MM-dd` format"};
            if (parsedDate > new Date()) return {message: "Must be a current or past date"};

            return {message: "Invalid date."};
        },
    ).transform(
        (dateString) => {
            const parsed = parse(dateString, "yyyy-MM-dd", new Date());
            return format(parsed, "yyyy-MM-dd");
        }
    );