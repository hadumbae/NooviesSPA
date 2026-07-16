/**
 * @fileoverview Zod schema and type definition for Mongoose sort order values.
 */

import {z} from "zod";

/** Zod schema for validating Mongoose-compatible sort order values. */
export const MongooseSortOrderSchema = z.union(
    [
        z.literal(1),
        z.literal(-1),
        z.literal("1"),
        z.literal("-1"),
        z.literal("asc"),
        z.literal("desc"),
        z.literal("ascending"),
        z.literal("descending"),
    ],
    {message: "A valid sort order is required."}
);

/** Type representing valid Mongoose sort order values. */
export type MongooseSortOrder = z.infer<typeof MongooseSortOrderSchema>;