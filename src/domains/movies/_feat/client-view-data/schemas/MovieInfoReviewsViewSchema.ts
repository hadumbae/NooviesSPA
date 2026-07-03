/**
 * @fileoverview Defines the schema for the composite movie information and reviews view.
 */

import {z} from "zod";
import {MovieDetailsSchema} from "@/domains/movies";
import {MovieReviewSummarySchema} from "@/domains/movie-reviews";

/** Zod schema for validating the combined movie details and review summary data. */
export const MovieInfoReviewsViewSchema = z.object({
    movie: z.lazy(() => MovieDetailsSchema),
    reviewDetails: MovieReviewSummarySchema,
});

/** Type definition inferred from the MovieInfoReviewsViewSchema. */
export type MovieInfoReviewsViewData = z.infer<typeof MovieInfoReviewsViewSchema>;