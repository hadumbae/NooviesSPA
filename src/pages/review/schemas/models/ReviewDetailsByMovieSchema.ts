/**
 * @file Movie review details response schema.
 * ReviewDetailsByMovieSchema.ts
 */

import {PaginatedPopulatedMovieReviewsSchema} from "@/pages/review/schemas/models/MovieReviewRelated.schema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {PopulatedMovieReviewSchema} from "@/pages/review/schemas/models/MovieReview.schema.ts";
import {z} from "zod";

/**
 * Paginated movie reviews with aggregate rating
 * and optional user-specific review.
 */
export const ReviewDetailsByMovieSchema = PaginatedPopulatedMovieReviewsSchema.merge(
    z.object({
        averageRating: PositiveNumberSchema
            .min(1, "Must be at least 1.")
            .max(5, "Must be 5 or less")
            .nullable(),
        userReview: PopulatedMovieReviewSchema
            .nullable(),
    }),
);

/**
 * Parsed movie review details response.
 */
export type ReviewDetailsByMovie = z.infer<typeof ReviewDetailsByMovieSchema>;