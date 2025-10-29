import { DateTime } from "luxon";
import { UTCISO8601StringSchema } from "@/common/schema/date-time/iso-8601/UTCISO8601StringSchema.ts";
import { z } from "zod";

/**
 * **UTC Day-Only DateTime Schema**
 *
 * A Zod schema that validates a **UTC ISO 8601–formatted string** (must include a trailing `"Z"`)
 * and transforms it into a **Luxon `DateTime`** object set to the **start of the day (00:00:00 UTC)**.
 *
 * ### Validation
 * - Must be a valid ISO 8601 string with a `"Z"` suffix, e.g. `"2025-10-29T15:45:00Z"`.
 * - Any valid time portion will be **truncated to midnight (00:00:00)** in UTC.
 *
 * ### Transformation
 * - Converts the string using `DateTime.fromISO(dateString)`.
 * - Applies `.startOf("day")`, ensuring the resulting DateTime represents **only the UTC date**, with no time-of-day precision.
 *
 * ### Usage
 * Use this schema when you need a normalized **UTC date-only** value —
 * for example, for calendar days, scheduling, or date grouping.
 *
 * @example
 * ```ts
 * const result = UTCDayOnlyDateTimeSchema.parse("2025-10-29T15:45:00Z");
 * console.log(result.toISO()); // "2025-10-29T00:00:00.000Z"
 * console.log(result.zoneName); // "UTC"
 * ```
 */
export const UTCDayOnlyDateTimeSchema = UTCISO8601StringSchema.transform(
    (dateString) => DateTime.fromISO(dateString).startOf("day")
);

/**
 * **UTC Day-Only DateTime**
 *
 * Represents a **Luxon `DateTime`** object normalized to midnight (00:00:00 UTC)
 * derived from a valid UTC ISO 8601 string.
 *
 * This type is ideal for operations that should ignore time precision and
 * instead represent just the **day** in UTC.
 */
export type UTCDayOnlyDateTime = z.infer<typeof UTCDayOnlyDateTimeSchema>;
