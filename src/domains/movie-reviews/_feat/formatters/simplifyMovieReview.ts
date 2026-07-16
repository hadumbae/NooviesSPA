/**
 * @fileoverview Utility for normalizing populated movie review objects.
 *
 */

import {validateData} from "@/common/_feat/validate-data/validateData.ts";
import {MovieReview, MovieReviewSchema} from "@/domains/movie-reviews/_schema/model";
import {MovieReviewDetails} from "@/domains/movie-reviews/_schema/model/MovieReviewDetailsSchema";
import {MyMovieReview} from "@/domains/movie-reviews/_schema/my-reviews";

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