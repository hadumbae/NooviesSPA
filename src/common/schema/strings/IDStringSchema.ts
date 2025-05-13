import {z} from "zod";

/**
 * A Zod schema for validating a 24-character string ID.
 *
 * @remarks
 * - Commonly used for MongoDB-style ObjectIDs or similar identifiers.
 * - Ensures the value is:
 *   - A string
 *   - Exactly 24 characters long
 *   - Not missing (throws `"Required."` if absent)
 *
 * @example
 * ```ts
 * IDString.parse("507f1f77bcf86cd799439011"); // ✅ Valid
 * IDString.parse("short"); // ❌ Throws "ID String must be exactly 24 characters."
 * ```
 */
export const IDStringSchema = z
    .string({required_error: "Required.", invalid_type_error: "Must be a valid ID string."})
    .length(24, "ID String must be exactly 24 characters.");

/**
 * A TypeScript type representing a validated 24-character object ID string.
 *
 * @remarks
 * - Inferred from {@link IDStringSchema}, which enforces the structure of a valid ID.
 * - Commonly used for database identifiers (e.g., MongoDB ObjectIDs).
 * - Ensures strong typing when working with validated IDs across the codebase.
 *
 * @see {@link IDStringSchema} for validation rules.
 */
export type ObjectId = z.infer<typeof IDStringSchema>;