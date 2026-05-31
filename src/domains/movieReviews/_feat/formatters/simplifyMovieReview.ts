/**
 * @fileoverview Utility for normalizing populated movie review objects.
 *
 */

import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {MovieReview, MovieReviewSchema} from "@/domains/movieReviews/schemas/model";
import {MovieReviewDetails} from "@/domains/movieReviews/schemas/model/MovieReviewDetailsSchema";
import {MyMovieReview} from "@/domains/movieReviews/schemas/my-reviews";

/**
 * Normalizes a populated movie review into its base schema shape and validates the result.
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