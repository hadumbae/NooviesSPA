import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {DateTime} from "luxon";

/**
 * **DateOnlyStringSchema**
 *
 * Zod schema for validating string values that represent a **date only**
 * (no time component) in the ISO-like format `yyyy-MM-dd`.
 *
 * ### Behavior
 * - Requires a **non-empty string**.
 * - Ensures the string matches the pattern `YYYY-MM-DD`.
 * - Validates that the date string represents a **real calendar date**
 *   using Luxon’s `DateTime.fromFormat`.
 *
 * ### Example
 * ```ts
 * DateOnlyStringSchema.parse("2025-11-07"); // ✅ valid
 * DateOnlyStringSchema.parse("2025-02-30"); // ❌ invalid (nonexistent date)
 * DateOnlyStringSchema.parse("07-11-2025"); // ❌ invalid format
 * ```
 */
export const DateOnlyStringSchema = NonEmptyStringSchema
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Must be yyyy-MM-dd.")
    .refine(v => DateTime.fromFormat(v, "yyyy-MM-dd").isValid, "Must be a valid date.");

/**
 * **DateOnlyString**
 *
 * Type inferred from {@link DateOnlyStringSchema}.
 * Represents a string value in `yyyy-MM-dd` format
 * that has been validated to be a real date.
 */
export type DateOnlyString = z.infer<typeof DateOnlyStringSchema>;
