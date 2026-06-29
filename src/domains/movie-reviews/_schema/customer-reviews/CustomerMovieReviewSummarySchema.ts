/**
 * @fileoverview Zod validation schema for a customer's movie review summary in the profile view.
 */

import {z} from "zod";
import {MovieReviewSchema} from "@/domains/movie-reviews/_schema";
import {MovieWithGenresSchema} from "@/domains/movies/_schema/movie";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";

/** Zod schema for validating a customer's movie review summary data. */
export const CustomerMovieReviewSummarySchema = MovieReviewSchema.extend({
    movie: MovieWithGenresSchema,
    helpfulCount: NonNegativeNumberSchema,
});

/** Type for a customer's movie review summary. */
export type CustomerMovieReviewSummary = z.infer<typeof CustomerMovieReviewSummarySchema>;