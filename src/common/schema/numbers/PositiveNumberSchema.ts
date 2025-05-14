import {z} from "zod";
import {RequiredNumberSchema} from "@/common/schema/numbers/RequiredNumberSchema.ts";

/**
 * A Zod schema that validates a required, positive number.
 *
 * @remarks
 * - Extends {@link RequiredNumberSchema}, so it:
 *   - Coerces input (e.g., strings) to numbers
 *   - Validates that a value is provided
 *   - Ensures the result is a valid number
 * - Adds an additional constraint: the number must be greater than 0.
 * - Returns `"Must be greater than 0"` if the value is 0 or negative.
 *
 * @example
 * ```ts
 * PositiveNumberSchema.parse("5"); // ✅ Valid (coerced to 5)
 * PositiveNumberSchema.parse(10); // ✅ Valid
 * PositiveNumberSchema.parse(0); // ❌ Throws "Must be greater than 0"
 * PositiveNumberSchema.parse(-3); // ❌ Throws "Must be greater than 0"
 * PositiveNumberSchema.parse(undefined); // ❌ Throws "Required."
 * ```
 */
export const PositiveNumberSchema = RequiredNumberSchema.gt(0, "Must be greater than 0");

/**
 * A TypeScript type representing a validated, positive number.
 *
 * @remarks
 * - Inferred from {@link PositiveNumberSchema}.
 * - Guarantees that the value is a number greater than 0.
 */
export type PositiveNumber = z.infer<typeof PositiveNumberSchema>;