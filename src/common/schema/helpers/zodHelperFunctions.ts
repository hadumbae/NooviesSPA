import {z, ZodTypeAny} from "zod";
import {TotalItemsNumberSchema} from "@/common/schema/numbers/TotalItemsNumberSchema.ts";

/**
 * Generates a Zod schema for a paginated API response.
 *
 * @typeParam TSchema - The Zod schema for individual items in the paginated list.
 *
 * @param schema - The Zod schema that defines the structure of each item in the `items` array.
 *
 * @returns A Zod object schema with the following shape:
 * - `totalItems`: Total number of items across all pages (validated by {@link TotalItemsNumberSchema}).
 * - `items`: An array of items validated against the provided `schema`.
 *
 * @example
 * ```ts
 * const UserSchema = z.object({
 *   id: z.string(),
 *   name: z.string(),
 * });
 *
 * const PaginatedUserSchema = generatePaginationSchema(UserSchema);
 *
 * // ✅ Valid
 * PaginatedUserSchema.parse({
 *   totalItems: 42,
 *   items: [{ id: "1", name: "Alice" }]
 * });
 *
 * // ❌ Invalid (missing items)
 * PaginatedUserSchema.parse({
 *   totalItems: 42
 * });
 * ```
 */
export const generatePaginationSchema = <TSchema extends ZodTypeAny>(schema: TSchema) => z.object({
    totalItems: TotalItemsNumberSchema,
    items: z.array(z.lazy(() => schema))
});