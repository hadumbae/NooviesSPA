/**
 * @file Zod validation schema for the aggregated Movie Review view.
 * @filename MovieReviewViewDataSchema.ts
 */

import {z} from "zod";
import {MovieReviewDetailsSchema} from "@/domains/review/schemas/models/MovieReview.schema.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";

/**
 * Aggregated schema for the public or movie-specific review section.
 * ---
 */
export const MovieReviewViewDataSchema = z.object({
    /** Total number of reviews available for this specific movie. */
    totalItems: NonNegativeNumberSchema,
    /** Collection of enriched reviews with author and engagement metadata. */
    items: z.array(z.lazy(() => MovieReviewDetailsSchema)),
    /** The calculated mean score (1-5); null if no reviews exist. */
    averageRating: NonNegativeNumberSchema.max(5, "Must be 5 or less").nullable(),
    /** The specific review authored by the current requester, if one exists. */
    userReview: MovieReviewDetailsSchema.nullable(),
});

/**
 * TypeScript type inferred from {@link MovieReviewViewDataSchema}.
 * Central data structure for rendering the Review section on Movie Detail pages.
 */
export type MovieReviewViewData = z.infer<typeof MovieReviewViewDataSchema>;