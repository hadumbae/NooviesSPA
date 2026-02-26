/**
 * @file Types for populated movie review collections.
 * MovieReviewRelated.types.ts
 */

import {z} from "zod";
import {
    PaginatedPopulatedMovieReviewsSchema,
    PopulatedMovieReviewArraySchema
} from "@/pages/review/schemas/models/MovieReviewRelated.schema.ts";

/**
 * Inferred type for an array of populated movie reviews.
 */
export type PopulatedMovieReviewArray = z.infer<typeof PopulatedMovieReviewArraySchema>;

/**
 * Inferred type for paginated populated movie reviews.
 */
export type PaginatedPopulatedMovieReviews = z.infer<typeof PaginatedPopulatedMovieReviewsSchema>;