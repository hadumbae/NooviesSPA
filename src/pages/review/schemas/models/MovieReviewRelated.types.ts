/**
 * @file Movie review collection types.
 * MovieReviewRelated.types.ts
 */

import {z} from "zod";
import {
    MovieReviewDetailsArraySchema,
    PaginatedMovieReviewDetailsSchema,
    PaginatedPopulatedMovieReviewsSchema,
    PopulatedMovieReviewArraySchema
} from "@/pages/review/schemas/models/MovieReviewRelated.schema.ts";

/**
 * Array of populated movie reviews.
 */
export type PopulatedMovieReviewArray =
    z.infer<typeof PopulatedMovieReviewArraySchema>;

/**
 * Paginated populated movie reviews.
 */
export type PaginatedPopulatedMovieReviews =
    z.infer<typeof PaginatedPopulatedMovieReviewsSchema>;

/**
 * Array of detailed movie reviews.
 */
export type MovieReviewDetailsArray =
    z.infer<typeof MovieReviewDetailsArraySchema>;

/**
 * Paginated detailed movie reviews.
 */
export type PaginatedMovieReviewDetails =
    z.infer<typeof PaginatedMovieReviewDetailsSchema>;