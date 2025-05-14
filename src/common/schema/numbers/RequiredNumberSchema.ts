import {z} from "zod";


/**
 * A Zod schema that coerces and validates a required number.
 *
 * @remarks
 * - Uses `.coerce.number()` to convert input (e.g. strings) to numbers where possible.
 * - Ensures the result is a valid number.
 * - Returns:
 *   - `"Required."` if the value is missing
 *   - `"Must be a valid number."` if the input cannot be coerced to a number
 * - Commonly used for form inputs where numeric values may be entered as strings (e.g., HTML input fields).
 *
 * @example
 * ```ts
 * RequiredNumberSchema.parse("42"); // ✅ Valid (coerced to number)
 * RequiredNumberSchema.parse(3.14); // ✅ Valid
 * RequiredNumberSchema.parse("abc"); // ❌ Throws "Must be a valid number."
 * RequiredNumberSchema.parse(undefined); // ❌ Throws "Required."
 * ```
 */
export const RequiredNumberSchema = z
    .coerce
    .number({required_error: "Required.", invalid_type_error: "Must be a valid number."});

/**
 * A TypeScript type representing a validated number coerced from user input.
 *
 * @remarks
 * - Inferred from {@link RequiredNumberSchema}.
 * - Guarantees that the value is a valid number after coercion.
 */
export type RequiredNumber = z.infer<typeof RequiredNumberSchema>;