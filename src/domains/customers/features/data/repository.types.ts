/**
 * @file Repository type definitions for the Customer Profile and Review data-access layer.
 * @filename repository.types.ts
 */

import {UserUniqueCode} from "@/domains/users/schemas/UserUniqueCodeSchema.ts";
import {MovieReviewUniqueCode} from "@/domains/review/features/codes";

/**
 * Parameters for fetching a high-level overview of a customer's profile activity.
 * ---
 */
export type GetFetchCustomerProfileViewData = {
    /** The validated unique code of the customer whose profile is being requested. */
    customerCode: UserUniqueCode;
};

/**
 * Configuration parameters for fetching a granular view of a specific movie review.
 * ---
 */
export type GetFetchCustomerReviewViewDataConfig = {
    /** The validated unique code of the review author (the customer). */
    customerCode: UserUniqueCode;
    /** The validated unique code of the specific movie review to retrieve. */
    reviewCode: MovieReviewUniqueCode;
};