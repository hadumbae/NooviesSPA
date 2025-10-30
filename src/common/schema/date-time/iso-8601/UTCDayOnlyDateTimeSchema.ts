import { DateTime } from "luxon";
import { UTCISO8601StringSchema } from "@/common/schema/date-time/iso-8601/UTCISO8601StringSchema.ts";
import { z } from "zod";

/**
 * **UTC Day-Only DateTime Schema**
 *
 * A Zod schema that validates a **UTC ISO 8601–formatted string** (must end with `"Z"`)
 * and transforms it into a **Luxon `DateTime`** object set to the **start of the day (00:00:00 UTC)**.
 *
 * ### Validation
 * - The input must be a valid ISO 8601 string with a `"Z"` suffix, e.g., `"2025-10-29T15:45:00Z"`.
 * - Any time component in the string will be **truncated to midnight (00:00:00)** in UTC.
 *
 * ### Transformation
 * - Uses `DateTime.fromISO(dateString, { zone: "utc" })` to parse the string.
 * - Applies `.startOf("day")` to ensure the resulting `DateTime` represents only the UTC date, ignoring hours, minutes, and seconds.
 *
 * ### Usage
 * Use this schema when you need a **normalized UTC date-only value**, such as:
 * - Calendar operations
 * - Scheduling or booking systems
 * - Grouping or comparing dates without considering time
 *
 * @example
 * ```ts
 * const result = UTCDayOnlyDateTimeSchema.parse("2025-10-29T15:45:00Z");
 * console.log(result.toISO()); // "2025-10-29T00:00:00.000Z"
 * console.log(result.zoneName); // "UTC"
 * ```
 */
export const UTCDayOnlyDateTimeSchema = UTCISO8601StringSchema.transform(
    (dateString) => DateTime.fromISO(dateString, { zone: "utc" }).startOf("day")
);

/**
 * **UTCDayOnlyDateTime**
 *
 * Represents a **Luxon `DateTime`** object normalized to midnight (00:00:00 UTC)
 * derived from a valid UTC ISO 8601 string.
 *
 * This type is ideal for scenarios where time-of-day precision is irrelevant,
 * and only the **day in UTC** is important.
 */
export type UTCDayOnlyDateTime = z.infer<typeof UTCDayOnlyDateTimeSchema>;
