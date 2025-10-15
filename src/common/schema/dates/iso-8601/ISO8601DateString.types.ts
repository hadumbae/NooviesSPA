import { z } from "zod";
import {
    UTCISO8601DateStringSchema,
    UTCISO8601DateTimeSchema,
} from "@/common/schema/dates/iso-8601/ISO8601DateString.schema.ts";

/**
 * Type representing a **UTC ISO 8601–formatted date-time string**.
 *
 * @description
 * Inferred from {@link UTCISO8601DateStringSchema}, this type
 * represents a serialized timestamp guaranteed to be:
 * - In full ISO 8601 format (`YYYY-MM-DDTHH:mm:ss.sssZ`)
 * - Explicitly marked as UTC (`Z` suffix)
 *
 * @example
 * ```ts
 * const timestamp: UTCISO8601DateString = "2025-10-15T06:45:00.000Z";
 * ```
 *
 * @remarks
 * This type is ideal for values exchanged between the frontend and backend
 * where time must remain in a standardized UTC string form.
 */
export type UTCISO8601DateString = z.infer<typeof UTCISO8601DateStringSchema>;

/**
 * Type representing a **Luxon DateTime instance** derived from a
 * validated UTC ISO 8601 string.
 *
 * @description
 * Inferred from {@link UTCISO8601DateTimeSchema}, this type reflects a
 * `DateTime` object created via `DateTime.fromISO`, preserving UTC time.
 *
 * @example
 * ```ts
 * const dateTime: UTCISO8601DateTime = DateTime.fromISO("2025-10-15T06:45:00.000Z");
 * console.log(dateTime.toUTC().toISO()); // → "2025-10-15T06:45:00.000Z"
 * ```
 *
 * @remarks
 * Use this type when working directly with Luxon's time manipulation
 * and formatting utilities after schema validation.
 */
export type UTCISO8601DateTime = z.infer<typeof UTCISO8601DateTimeSchema>;
