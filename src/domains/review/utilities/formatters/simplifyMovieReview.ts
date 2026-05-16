/**
 * @fileoverview Utility for normalising populated movie review objects.
 */

import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {MovieReview, MovieReviewSchema} from "@/domains/review/schemas/models";
import {MovieReviewDetails} from "src/domains/review/schemas/models/MovieReviewDetailsSchema";
import {MyMovieReview} from "@/domains/review/schemas/my-reviews";

/**
 * Transforms a populated movie review into its base schema shape and validates it.
 */
export function simplifyMovieReview(
    review: MyMovieReview | MovieReviewDetails
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