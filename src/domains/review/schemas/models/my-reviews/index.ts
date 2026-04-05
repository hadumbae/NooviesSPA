import {MyMovieReviewSchema, type MyMovieReview} from "@/domains/review/schemas/models/my-reviews/MyMovieReviewSchema.ts";

import {
    MyMovieReviewPaginatedSchema,
    MyPaginatedMovieReviews
} from "@/domains/review/schemas/models/my-reviews/MyMovieReviewPaginatedSchema.ts";
import {
    MyMovieReviewArraySchema,
    MyMovieReviewsArray
} from "@/domains/review/schemas/models/my-reviews/MyMovieReviewArraySchema.ts";

export {
    MyMovieReviewSchema,
    MyMovieReviewArraySchema,
    MyMovieReviewPaginatedSchema,
}

export type {
    MyMovieReview,
    MyMovieReviewsArray,
    MyPaginatedMovieReviews
}