/**
 * @fileoverview Zod schema for Mongoose-compatible numeric sort orders with transformation.
 * Validates numeric or string representations and ensures the output is a standard number.
 */

import {z} from "zod";

/**
 * Schema for Mongoose numeric sort orders.
 */
export const MongooseNumericSortOrderSchema = z.union(
    [z.literal(1), z.literal(-1), z.literal("1"), z.literal("-1")],
    {message: "A valid numeric sort order is required (1, -1, '1', or '-1')."}
).transform((val) => Number(val));

/**
 * TypeScript type inferred from the MongooseNumericSortOrderSchema.
 * Represents the final transformed type: 1 | -1.
 */
export type MongooseNumericSortOrder = z.infer<typeof MongooseNumericSortOrderSchema>;