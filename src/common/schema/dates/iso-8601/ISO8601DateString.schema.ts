import { RequiredStringSchema } from "@/common/schema/strings/RequiredStringSchema.ts";
import { DateTime } from "luxon";

/**
 * Zod schema validating a **UTC ISO 8601 date-time string**.
 *
 * @description
 * Ensures that the value is a properly formatted ISO 8601 string
 * explicitly marked as UTC (`Z` suffix). This prevents accepting
 * local or offset-based timestamps that could introduce timezone errors.
 *
 * @example
 * ✅ `"2025-10-15T06:45:00.000Z"`
 * ❌ `"2025-10-15T06:45:00+07:00"`
 * ❌ `"2025-10-15"`
 *
 * @remarks
 * This schema is typically used for serializing or validating timestamps
 * exchanged between the backend and frontend in UTC format.
 *
 * @see {@link UTCISO8601DateTimeSchema} for a transformed `DateTime` variant.
 */
export const UTCISO8601DateStringSchema = RequiredStringSchema.regex(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/,
    { message: "Must be UTC ISO 8601." },
);

/**
 * Zod schema that validates and transforms a **UTC ISO 8601 string**
 * into a Luxon {@link DateTime} object.
 *
 * @description
 * Extends {@link UTCISO8601DateStringSchema} by parsing the valid string
 * using `DateTime.fromISO`. The resulting value is a Luxon `DateTime`
 * instance representing the same UTC timestamp.
 *
 * @example
 * ```ts
 * import { UTCISO8601DateTimeSchema } from "@/common/schema/date/UTCISO8601DateSchema.ts";
 *
 * const dt = UTCISO8601DateTimeSchema.parse("2025-10-15T06:45:00.000Z");
 * console.log(dt.toUTC().toISO()); // → "2025-10-15T06:45:00.000Z"
 * ```
 *
 * @remarks
 * Useful when you want direct access to `DateTime` utilities (e.g., time math,
 * formatting, or timezone conversions) immediately after validation.
 */
export const UTCISO8601DateTimeSchema = UTCISO8601DateStringSchema.transform(
    (dateString) => DateTime.fromISO(dateString),
);
