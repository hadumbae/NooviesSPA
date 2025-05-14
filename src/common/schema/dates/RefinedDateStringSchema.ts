import {z} from "zod";
import {DateStringSchema} from "@/common/schema/helpers/ZodDateHelpers.ts";

/**
 * A Zod schema for validating a required date string in `YYYY-MM-DD` format,
 * while allowing initial `undefined` or empty string values — useful for form workflows.
 *
 * @remarks
 * - Accepts `undefined` and `""` initially to support unfilled form fields.
 * - Refines to require a non-empty, valid date string in ISO `YYYY-MM-DD` format.
 * - Combines:
 *   - `z.union()` to allow `undefined`, `""`, and a valid date string
 *   - `.refine()` to enforce presence and prevent empty strings
 * - Built on top of {@link DateStringSchema}, which handles format validation.
 * - Commonly used in forms (e.g., React Hook Form) where date fields start empty but must eventually be filled correctly.
 *
 * @example
 * ```ts
 * RefinedDateStringSchema.parse("2024-12-25"); // ✅ Valid
 * RefinedDateStringSchema.parse(""); // ❌ Throws "Required."
 * RefinedDateStringSchema.parse(undefined); // ❌ Throws "Required."
 * RefinedDateStringSchema.parse("25-12-2024"); // ❌ Throws "Date must be in YYYY-MM-DD format."
 * ```
 */
export const RefinedDateStringSchema = z
    .union([z.undefined(), z.literal(""), DateStringSchema])
    .refine((value) => value && value !== "", {message: "Required."});


/**
 * A TypeScript type representing a validated, non-empty date string in `YYYY-MM-DD` format.
 *
 * @remarks
 * - Inferred from {@link RefinedDateStringSchema}.
 * - Ensures presence and proper formatting of date input, after initial undefined/empty states.
 */
export type RefinedDateString = z.infer<typeof RefinedDateStringSchema>;