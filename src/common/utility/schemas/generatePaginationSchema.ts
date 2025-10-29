import { z, ZodTypeAny } from "zod";
import { CoercedPositiveNumberSchema } from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";

/**
 * Generates a Zod schema for paginated data structures.
 *
 * @template TSchema - Schema type of each individual item in the `items` array.
 * @param schema - A Zod schema for a single item.
 * @returns A Zod object schema containing:
 *  - `totalItems`: The total number of items (coerced positive number, optional if empty string).
 *  - `items`: An array of items validated against the provided `schema`.
 *
 * @example
 * ```ts
 * const UserSchema = z.object({ id: z.string(), name: z.string() });
 * const PaginatedUsersSchema = generatePaginationSchema(UserSchema);
 * ```
 */
export const generatePaginationSchema = <TSchema extends ZodTypeAny>(schema: TSchema) =>
    z.object({
        totalItems: preprocessEmptyStringToUndefined(CoercedPositiveNumberSchema),
        items: z.array(z.lazy(() => schema)),
    });
