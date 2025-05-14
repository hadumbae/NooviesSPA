import {z} from "zod";
import {RequiredNumberSchema} from "@/common/schema/numbers/RequiredNumberSchema.ts";

/**
 * A Zod schema designed to validate a required, positive number
 * while gracefully handling `undefined` inputs — typically for form use cases.
 *
 * @remarks
 * - Accepts `undefined` initially (e.g., before a user interacts with a form).
 * - Applies two refinement steps:
 *   1. Ensures a value is present and not `NaN` — throws `"Required."` if not.
 *   2. Ensures the number is greater than 0 — throws `"Must be larger than 0."` if not.
 * - Useful in scenarios such as React Hook Form, where numeric inputs may
 *   initially be `undefined`, especially when bound to optional form fields.
 * - Built on top of {@link RequiredNumberSchema}, so it inherits coercion and basic number validation.
 */
export const RefinedPositiveNumberSchema = z
    .union([z.undefined(), RequiredNumberSchema])
    .refine((value) => (value && !isNaN(value)), {message: "Required."})
    .refine((value) => (value && value > 0), {message: "Must be larger than 0."});

/**
 * A TypeScript type representing a strictly positive number
 * that has passed both presence and positivity validation.
 *
 * @remarks
 * - Inferred from {@link RefinedPositiveNumberSchema}.
 * - Use when integrating with forms where initial input may be undefined
 *   but must ultimately be a number greater than zero.
 */
export type RefinedPositiveNumber = z.infer<typeof RefinedPositiveNumberSchema>;