import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";

/**
 * **UTC ISO 8601 String Schema**
 *
 * A `Zod` schema that validates strings formatted as **UTC ISO 8601 timestamps**.
 *
 * - The string **must include a trailing "Z"**, indicating that the timestamp
 *   is explicitly in **Coordinated Universal Time (UTC)**.
 * - Valid examples:
 *   - `"2025-10-29T09:00:00Z"`
 *   - `"2025-10-29T09:00:00.123Z"`
 * - Invalid examples (no "Z" or with timezone offset):
 *   - `"2025-10-29T09:00:00"` ❌ (missing `"Z"`)
 *   - `"2025-10-29T09:00:00+07:00"` ❌ (includes timezone offset)
 *
 * This ensures a consistent UTC-based format across API inputs and stored values.
 */
export const UTCISO8601StringSchema = NonEmptyStringSchema.regex(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/,
    { message: "Must be UTC ISO 8601." },
);

/**
 * **UTC ISO 8601 String**
 *
 * Represents a **strict UTC ISO 8601–formatted string**.
 *
 * - The string **must include a trailing "Z"**, which explicitly marks it as
 *   Coordinated Universal Time (UTC).
 * - Example valid values:
 *   - `"2025-10-29T09:00:00Z"`
 *   - `"2025-10-29T09:00:00.500Z"`
 * - Example invalid values:
 *   - `"2025-10-29T09:00:00"` ❌ (missing `"Z"`)
 *   - `"2025-10-29T09:00:00+07:00"` ❌ (contains a timezone offset)
 *
 * This type is best used for **API responses**, **database fields**, or anywhere
 * a raw UTC timestamp string is expected.
 */
export type UTCISO8601String = z.infer<typeof UTCISO8601StringSchema>;