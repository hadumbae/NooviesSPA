import {MovieReview, MovieReviewSchema} from "@/domains/review/schemas/models/MovieReviewSchema.ts";
import {MovieReviewSummaryData, MovieReviewSummarySchema} from "@/domains/review/schemas/models/MovieReviewSummarySchema.ts";
import { MovieReviewDetails, MovieReviewDetailsSchema } from "./MovieReviewDetailsSchema";

export {
    MovieReviewSchema,
    MovieReviewDetailsSchema,
    MovieReviewSummarySchema,
}

export type {
    MovieReview,
    MovieReviewDetails,
    MovieReviewSummaryData,
}

