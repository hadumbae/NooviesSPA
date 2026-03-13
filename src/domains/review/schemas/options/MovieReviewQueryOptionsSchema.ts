/**
 * @file Combined query options schema for movie reviews.
 * MovieReviewQueryOptionsSchema.ts
 */

import {MovieReviewMatchQueryFiltersSchema} from "@/domains/review/schemas/options/MovieReviewMatchQueryFiltersSchema.ts";
import {MovieReviewMatchQuerySortsSchema} from "@/domains/review/schemas/options/MovieReviewMatchQuerySortsSchema.ts";
import {z} from "zod";

/**
 * Unified schema for movie review query options.
 */
export const MovieReviewQueryOptionsSchema = MovieReviewMatchQueryFiltersSchema
    .merge(MovieReviewMatchQuerySortsSchema);

/**
 * Inferred type for movie review query options.
 */
export type MovieReviewQueryOptions = z.infer<typeof MovieReviewQueryOptionsSchema>;