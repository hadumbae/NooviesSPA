import {DateTime} from "luxon";
import {UTCISO8601DateStringSchema} from "@/common/schema/dates/iso-8601/ISO8601DateString.schema.ts";

/**
 * **ParsedUTCDayOnlyDateStringSchema**
 *
 * A Zod schema that:
 * - Accepts a valid UTC ISO 8601 date string (e.g., `"2025-08-20"` or `"2025-08-20T15:30:00Z"`).
 * - Parses it into a Luxon {@link DateTime} object normalized to **midnight UTC**.
 * - Ignores any time component provided in the input.
 *
 * ### Behavior
 * - Input validation is delegated to {@link UTCISO8601DateStringSchema}.
 * - The transformation converts the string to a `DateTime` at the start of the UTC day (`00:00:00Z`).
 *
 * ### Example
 * ```ts
 * const dateTime = ParsedUTCDayOnlyDateStringSchema.parse("2025-08-20T15:30:00Z");
 * console.log(dateTime.toISO()); // "2025-08-20T00:00:00.000Z"
 * ```
 *
 * @remarks
 * This schema is useful for cases where you only care about the date portion (year, month, day)
 * but still need a standardized UTC-normalized `DateTime` representation for consistent comparison
 * or serialization.
 */
export const ParsedUTCDayOnlyDateStringSchema = UTCISO8601DateStringSchema.transform(
    (dateString) => DateTime.fromISO(dateString).startOf("day")
);
