/**
 * @file Zod schema for movie review details by movie.
 *
 * ReviewDetailsByMovieSchema.ts
 */

import { z } from "zod";
import { PositiveNumberSchema } from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import { MovieReviewDetailsSchema } from "@/pages/review/schemas/models/MovieReview.schema.ts";
import { PaginatedMovieReviewDetailsSchema } from "@/pages/review/schemas/models/MovieReviewRelated.schema.ts";

/**
 * Extends paginated review results with aggregate rating
 * and an optional user review.
 */
export const ReviewDetailsByMovieSchema =
    PaginatedMovieReviewDetailsSchema.merge(
        z.object({
            /**
             * Average rating for the movie.
             */
            averageRating: PositiveNumberSchema
                .min(1, "Must be at least 1.")
                .max(5, "Must be 5 or less")
                .nullable(),

            /**
             * Review authored by the current user, if present.
             */
            userReview: MovieReviewDetailsSchema
                .nullable(),
        }),
    );

/**
 * Inferred type for ReviewDetailsByMovieSchema.
 */
export type ReviewDetailsByMovie =
    z.infer<typeof ReviewDetailsByMovieSchema>;