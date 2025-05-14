import {RequiredNumberSchema} from "@/common/schema/numbers/RequiredNumberSchema.ts";
import {z} from "zod";

/**
 * A Zod schema that validates the total number of items resulting from a backend query,
 * typically used for pagination metadata.
 *
 * @remarks
 * - Extends {@link RequiredNumberSchema}, so it:
 *   - Coerces input to a number
 *   - Requires a value to be present and valid
 * - Adds a `.min(0)` constraint to ensure the number is zero or positive.
 * - Returns `"Must be 0 or more."` if a negative number is provided.
 *
 * @useCase
 * - Suitable for API responses where a `totalItems` or `totalCount` field
 *   indicates the total number of records matching a paginated query.
 *
 * @example
 * ```ts
 * TotalItemsNumberSchema.parse(100); // ✅ Valid
 * TotalItemsNumberSchema.parse("0"); // ✅ Valid (coerced)
 * TotalItemsNumberSchema.parse(-5); // ❌ Throws "Must be 0 or more."
 * TotalItemsNumberSchema.parse(undefined); // ❌ Throws "Required."
 * ```
 */
export const TotalItemsNumberSchema = RequiredNumberSchema.min(0, "Must be 0 or more.");

/**
 * A TypeScript type representing a validated count of total items for pagination.
 *
 * @remarks
 * - Inferred from {@link TotalItemsNumberSchema}.
 * - Guarantees the value is a non-negative number (≥ 0).
 */
export type TotalItemsNumber = z.infer<typeof TotalItemsNumberSchema>;