/**
 * @fileoverview Zod validation schema for a customer's review summary in the profile view.
 */

import {z} from "zod";
import {MovieReviewSchema} from "@/domains/review/schemas/models";
import {MovieWithGenresSchema} from "@/domains/movies/schema/movie";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";

/** Zod schema for validating a customer's movie review summary data. */
export const CustomerMovieReviewSummarySchema = MovieReviewSchema.extend({
    movie: MovieWithGenresSchema,
    helpfulCount: NonNegativeNumberSchema,
});

/** Type definition for a customer's movie review summary. */
export type CustomerMovieReviewSummary = z.infer<typeof CustomerMovieReviewSummarySchema>;