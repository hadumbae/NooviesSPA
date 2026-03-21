import {MyMovieReviewSchema, type MyMovieReview} from "@/domains/review/schemas/models/my-reviews/MyMovieReviewSchema.ts";

import {
    MyMovieReviewArraySchema,
    MyMovieReviewPaginatedSchema,
    MyMovieReviewsArray,
    MyPaginatedMovieReviews
} from "@/domains/review/schemas/models/my-reviews/MyMovieReviewRelatedSchemas.ts";

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