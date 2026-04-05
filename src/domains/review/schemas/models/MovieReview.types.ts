/**
 * @file Inferred TypeScript types derived from Movie Review Zod schemas.
 * @filename MovieReview.types.ts
 */

import {z} from "zod";
import {
    MovieReviewDetailsSchema,
    MovieReviewSchema,
    PopulatedMovieReviewSchema
} from "@/domains/review/schemas/models/MovieReview.schema.ts";

/**
 * Basic movie review entity.
 * Represents the raw document structure with non-populated relational IDs.
 */
export type MovieReview = z.infer<typeof MovieReviewSchema>;

/**
 * Fully populated movie review entity.
 * Includes both resolved author (User) and subject (Movie) information.
 */
export type PopulatedMovieReview = z.infer<typeof PopulatedMovieReviewSchema>;

/**
 * Comprehensive movie review entity with contextual metadata.
 * Includes interaction metrics and user-specific relationship flags for UI logic.
 */
export type MovieReviewDetails = z.infer<typeof MovieReviewDetailsSchema>;