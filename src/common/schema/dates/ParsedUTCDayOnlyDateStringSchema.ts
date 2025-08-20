import {z} from "zod";
import {isValid, parseISO} from "date-fns";

/**
 * Parses an ISO 8601 date string into a UTC `Date` instance representing **midnight UTC**.
 *
 * - Input must be a valid ISO date string (e.g., `"2025-08-20"` or `"2025-08-20T00:00:00Z"`).
 * - Ignores the time portion; only the date (year, month, day) is considered.
 * - Returns a `Date` instance normalized to midnight UTC.
 *
 * Example usage:
 * ```ts
 * const date: Date = ParsedUTCDayOnlyDateStringSchema.parse("2025-08-20T15:30:00Z");
 * console.log(date.toISOString()); // "2025-08-20T00:00:00.000Z"
 * ```
 */
export const ParsedUTCDayOnlyDateStringSchema = z
    .string({required_error: "Required.", invalid_type_error: "Must be a valid date string."})
    .refine(
        (dateString) => isValid(parseISO(dateString)),
        {message: "Must be a valid ISO date string."}
    ).transform(
        (dateString) => {
            const parsed = parseISO(dateString);
            parsed.setUTCHours(0, 0, 0, 0);
            return parsed;
        }
    );