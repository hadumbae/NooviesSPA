/**
 * @fileoverview Defines the validation schema and type for movie review ratings.
 */

import {z} from "zod";
import {CoercedPositiveIntegerSchema} from "@/common/_schemas";

/** Zod schema validating that a rating is an integer between 0 and 5. */
export const MovieReviewRatingSchema = CoercedPositiveIntegerSchema
    .gte(0, "Must be 0 or more.")
    .lte(5, "Must be 5 or less.");

/** Type representing a valid movie review rating value. */
export type MovieReviewRating = z.infer<typeof MovieReviewRatingSchema>;