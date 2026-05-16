/**
 * @file Utility for normalizing populated movie review objects.
 *
 * simplifyMovieReview.ts
 */

import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {MovieReview, MovieReviewSchema} from "@/domains/review/schemas/models";
import {MovieReviewDetails} from "src/domains/review/schemas/models/MovieReviewDetailsSchema";

/**
 * Simplifies a populated movie review into its base schema shape.
 *
 * @throws Zod validation error if the transformed data
 *         does not conform to `MovieReviewSchema`
 */
export function simplifyMovieReview(
    review: MovieReviewDetails
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