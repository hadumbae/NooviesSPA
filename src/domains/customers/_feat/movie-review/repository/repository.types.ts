/**
 * @fileoverview Type definitions for the customer movie review repository.
 */

import {UserUniqueCode} from "@/domains/users/schemas/UserUniqueCodeSchema";
import {MovieReviewUniqueCode} from "@/domains/movieReviews/schemas/fields/MovieReviewUniqueCodeSchema";

/** Configuration parameters for fetching a granular view of a specific movie review. */
export type GetFetchCustomerReviewViewDataConfig = {
    customerCode: UserUniqueCode
    reviewCode: MovieReviewUniqueCode
}