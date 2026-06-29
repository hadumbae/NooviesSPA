/**
 * @fileoverview Type definitions for the customer movie review repository.
 */

import {UserUniqueCode} from "@/domains/users/_schema/fields/UserUniqueCodeSchema";
import {MovieReviewUniqueCode} from "@/domains/movie-reviews/_schema/fields/MovieReviewUniqueCodeSchema";

/** Configuration parameters for fetching a granular view of a specific movie review. */
export type GetFetchCustomerReviewViewDataConfig = {
    customerCode: UserUniqueCode
    reviewCode: MovieReviewUniqueCode
}