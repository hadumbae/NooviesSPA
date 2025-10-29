import {DateTime} from "luxon";
import {
    UTCISO8601StringSchema
} from "@/common/schema/date-time/iso-8601/UTCISO8601StringSchema.ts";
import {z} from "zod";

/**
 * **UTC ISO 8601 → Luxon DateTime Schema**
 *
 * A schema that:
 * 1. Validates a string using {@link UTCISO8601StringSchema}.
 * 2. Transforms the validated string into a `luxon.DateTime` instance
 *    representing the **exact same UTC instant**.
 *
 * - The resulting `DateTime` object will have:
 *   - `zone` set to `"UTC"`.
 *   - No timezone offset applied (unlike local time parsing).
 *
 * @example
 * ```ts
 * const dt = UTCISO8601DateTimeSchema.parse("2025-10-29T09:00:00Z");
 * console.log(dt.toISO()); // "2025-10-29T09:00:00.000Z"
 * console.log(dt.zoneName); // "UTC"
 * ```
 */
export const UTCISO8601DateTimeSchema = UTCISO8601StringSchema.transform(
    (dateString) => DateTime.fromISO(dateString),
);

/**
 * **UTC ISO 8601 DateTime**
 *
 * Represents a **Luxon `DateTime` object** derived from a valid UTC ISO 8601 string.
 *
 * - Internally parsed using `DateTime.fromISO()` from the Luxon library.
 * - The resulting `DateTime` instance is in the **UTC timezone** (`zoneName: "UTC"`).
 * - It **does not carry any local timezone information**, ensuring that it
 *   represents the same absolute instant globally.
 *
 * Use this type when **performing time-based calculations** or **rendering
 * human-readable times** within the application.
 *
 * @example
 * ```ts
 * const dt: UTCISO8601DateTime = DateTime.fromISO("2025-10-29T09:00:00Z");
 * console.log(dt.toISO()); // "2025-10-29T09:00:00.000Z"
 * console.log(dt.zoneName); // "UTC"
 * ```
 */
export type UTCISO8601DateTime = z.infer<typeof UTCISO8601DateTimeSchema>;