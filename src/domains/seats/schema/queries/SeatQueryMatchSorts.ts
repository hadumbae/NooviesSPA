/**
 * @file SeatQuerySortsSchema.ts
 *
 * Zod schema and derived type for validating Seat query sort parameters.
 *
 * Sort fields map directly to MongoDB/Mongoose `$sort` semantics.
 */

import { z } from "zod";
import { MongooseSortOrderSchema } from "@/common/schema/enums/MongooseSortOrderSchema.ts";

/**
 * Zod schema for Seat query sort options.
 *
 * Accepts MongoDB sort orders:
 * - `1`  → ascending
 * - `-1` → descending
 *
 * @example
 * ```ts
 * SeatQuerySortsSchema.parse({
 *   sortByRow: 1,
 *   sortBySeatNumber: -1,
 * });
 * ```
 */
export const SeatQuerySortsSchema = z.object({
    sortByTheatre: MongooseSortOrderSchema.optional(),
    sortByScreen: MongooseSortOrderSchema.optional(),
    sortByRow: MongooseSortOrderSchema.optional(),
    sortBySeatNumber: MongooseSortOrderSchema.optional(),
    sortBySeatType: MongooseSortOrderSchema.optional(),
    sortByIsAvailable: MongooseSortOrderSchema.optional(),
    sortByPriceMultiplier: MongooseSortOrderSchema.optional(),
});

/**
 * Inferred TypeScript type for Seat query sort options.
 *
 * @remarks
 * Derived from {@link SeatQuerySortsSchema} and intended for repository-level
 * query composition.
 */
export type SeatQuerySorts = z.infer<typeof SeatQuerySortsSchema>;
