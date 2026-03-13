/**
 * @file Utility for normalizing populated movie review objects.
 *
 * simplifyMovieReview.ts
 */

import {
    MovieReview,
    MovieReviewDetails,
    PopulatedMovieReview
} from "@/domains/review/schemas/models/MovieReview.types.ts";
import {MovieReviewSchema} from "@/domains/review/schemas/models/MovieReview.schema.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";

/**
 * Simplifies a populated movie review into its base schema shape.
 *
 * @throws Zod validation error if the transformed data
 *         does not conform to `MovieReviewSchema`
 */
export function simplifyMovieReview(
    review: PopulatedMovieReview | MovieReviewDetails
): MovieReview {
    const {
        user: {_id: user},
        movie: {_id: movie},
        ...restData
    } = review;

    const dataToParse = {...restData, user, movie};
    const {success, error, data: parsed} = validateData({
        schema: MovieReviewSchema,
        data: dataToParse,
    });

    if (!success) throw error;
    return parsed;
}