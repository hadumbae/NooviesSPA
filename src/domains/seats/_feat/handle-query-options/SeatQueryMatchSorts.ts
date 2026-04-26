/**
 * @fileoverview Zod schema and type definitions for validating Seat query sort parameters.
 */

import { z } from "zod";
import { MongooseSortOrderSchema } from "@/common/schema/enums/MongooseSortOrderSchema.ts";

/**
 * Zod schema for Seat-specific sort options.
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
 * TypeScript type inferred from {@link SeatQuerySortsSchema}.
 */
export type SeatQuerySorts = z.infer<typeof SeatQuerySortsSchema>;