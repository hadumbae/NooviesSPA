import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";

/**
 * **Date String Schema**
 *
 * A Zod schema that validates a string in the **`yyyy-MM-dd`** format.
 *
 * ### Validation
 * - The string must be non-empty.
 * - Must match the exact pattern: 4-digit year, 2-digit month, 2-digit day.
 * - Example of a valid string: `"2025-10-29"`.
 *
 * ### Usage
 * Use this schema for values that represent a **calendar date without time**.
 *
 * @example
 * ```ts
 * const date = DateStringSchema.parse("2025-10-29");
 * console.log(date); // "2025-10-29"
 * ```
 */
export const DateStringSchema = NonEmptyStringSchema
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Must be yyyy-MM-dd.");

/**
 * **DateString**
 *
 * Type representing a string in the **`yyyy-MM-dd`** format.
 */
export type DateString = z.infer<typeof DateStringSchema>;