import {z, ZodTypeAny} from "zod";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";

/**
 * Generates a Zod schema for paginated data structures.
 *
 * @template TSchema - Schema type representing each individual item in the `items` array.
 * @param schema - A Zod schema defining validation rules for a single item.
 * @returns A Zod object schema containing:
 *  - `totalItems`: The total number of items (a non-negative number, allowing `0`).
 *  - `items`: An array of items validated against the provided `schema`.
 *
 * @example
 * ```ts
 * const UserSchema = z.object({ id: z.string(), name: z.string() });
 * const PaginatedUsersSchema = generatePaginationSchema(UserSchema);
 *
 * // Example validation
 * PaginatedUsersSchema.parse({
 *   totalItems: 0,
 *   items: [],
 * });
 * ```
 */
export const generatePaginationSchema = <TSchema extends ZodTypeAny>(schema: TSchema) =>
    z.object({
        totalItems: NonNegativeNumberSchema,
        items: z.array(z.lazy(() => schema)),
    });
