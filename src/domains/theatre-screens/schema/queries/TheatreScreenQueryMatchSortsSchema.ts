/**
 * @fileoverview Zod schema and type definitions for sorting Theatre Screen query results.
 * Standardizes how MongoDB sort parameters are passed for screen-related lists.
 */

import {z} from "zod";
import {MongooseSortOrderSchema} from "@/common/schema/enums/MongooseSortOrderSchema.ts";

/**
 * Zod schema for validating theatre screen sort configurations.
 */
export const TheatreScreenQueryMatchSortsSchema = z.object({
    sortByName: MongooseSortOrderSchema.optional(),
    sortByCapacity: MongooseSortOrderSchema.optional(),
    sortByScreenType: MongooseSortOrderSchema.optional(),
    sortByCreatedAt: MongooseSortOrderSchema.optional(),
});

/**
 * TypeScript type for Theatre Screen query sorting.
 */
export type TheatreScreenQuerySorts = z.infer<typeof TheatreScreenQueryMatchSortsSchema>;