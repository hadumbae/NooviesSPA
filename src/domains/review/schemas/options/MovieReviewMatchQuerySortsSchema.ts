/**
 * @file Query sort schema for movie review matching.
 * MovieReviewMatchSortsSchema.ts
 */

import {z} from "zod";
import {MongooseSortOrderSchema} from "@/common/schema/enums/MongooseSortOrderSchema.ts";

/**
 * Sort criteria for movie review queries.
 */
export const MovieReviewMatchQuerySortsSchema = z.object({
    sortByRating: MongooseSortOrderSchema.optional(),
});

/**
 * Inferred type for movie review query sorts.
 */
export type MovieReviewMatchQuerySorts = z.infer<typeof MovieReviewMatchQuerySortsSchema>;