/**
 * @fileoverview Defines the schema and type for a summary of movie reviews.
 */

import {z} from "zod";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {MovieReviewDetailsSchema} from "@/domains/movie-reviews/_schema/model/MovieReviewDetailsSchema.ts";

/** Zod schema for validating a summary of movie reviews including average rating and user-specific review. */
export const MovieReviewSummarySchema = z.object({
    totalItems: NonNegativeNumberSchema,
    items: z.array(z.lazy(() => MovieReviewDetailsSchema)),
    averageRating: NonNegativeNumberSchema.max(5, "Must be 5 or less").nullable(),
    userReview: MovieReviewDetailsSchema.nullable(),
});

/** Data type representing a summary of movie reviews. */
export type MovieReviewSummaryData = z.infer<typeof MovieReviewSummarySchema>;