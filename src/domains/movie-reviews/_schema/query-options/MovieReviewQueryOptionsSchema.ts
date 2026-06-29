/**
 * @file Combined query options schema for movie reviews.
 * MovieReviewQueryOptionsSchema.ts
 */

import {MovieReviewMatchQueryFiltersSchema} from "@/domains/movie-reviews/_schema/query-options/MovieReviewMatchQueryFiltersSchema.ts";
import {MovieReviewMatchQuerySortsSchema} from "@/domains/movie-reviews/_schema/query-options/MovieReviewMatchQuerySortsSchema.ts";
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