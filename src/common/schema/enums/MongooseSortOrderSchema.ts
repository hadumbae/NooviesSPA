import {z} from "zod";

/**
 * A Zod schema representing valid sort order values for Mongoose queries.
 *
 * Acceptable values include both numeric and string-based representations:
 * - `1` or `"asc"` or `"ascending"` for ascending order
 * - `-1` or `"desc"` or `"descending"` for descending order
 *
 * This schema can be used to validate sort parameters in APIs or internal logic
 * to ensure compatibility with Mongoose's sorting syntax.
 *
 * @example
 * ```ts
 * MongooseSortOrderSchema.parse("asc");     // ✅ valid
 * MongooseSortOrderSchema.parse(-1);        // ✅ valid
 * MongooseSortOrderSchema.parse("invalid"); // ❌ throws ZodError
 * ```
 */
export const MongooseSortOrderSchema = z.union(
    [
        z.literal(1),
        z.literal(-1),
        z.literal("asc"),
        z.literal("desc"),
        z.literal("ascending"),
        z.literal("descending"),
    ],
    {message: "A valid sort order is required."}
);

export type MongooseSortOrder = z.infer<typeof MongooseSortOrderSchema>;