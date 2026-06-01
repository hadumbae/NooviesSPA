/**
 * @fileoverview Defines the validation schema and type for movie review ratings.
 */

import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {z} from "zod";

/** Zod schema validating that a rating is an integer between 0 and 5. */
export const MovieReviewRatingSchema = PositiveNumberSchema
    .int("Must be an integer.")
    .gte(0, "Must be 0 or more.")
    .lte(5, "Must be 5 or less.");

/** Type representing a valid movie review rating value. */
export type MovieReviewRating = z.infer<typeof MovieReviewRatingSchema>;