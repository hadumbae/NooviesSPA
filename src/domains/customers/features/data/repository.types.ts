/**
 * @file Repository type definitions for the Customer Profile and Review data-access layer.
 * @filename repository.types.ts
 */

import {UserUniqueCode} from "@/domains/users/schemas/UserUniqueCodeSchema.ts";
import {MovieReviewUniqueCode} from "@/domains/review/features/codes";
import {PaginationValues} from "@/common/features/fetch-pagination-search-params";

/**
 * Parameters for fetching a high-level overview of a customer's profile activity.
 * ---
 */
export type GetFetchCustomerProfileViewDataConfig = {
    /** The validated unique code of the customer whose profile is being requested. */
    customerCode: UserUniqueCode;
};

/**
 * Configuration for fetching a paginated list of reviews authored by a specific customer.
 * ---
 */
export type GetFetchCustomerReviewsViewDataConfig =  {
    /** The validated unique code of the review author. */
    customerCode: UserUniqueCode;
    /** Current pagination state (page, perPage) used to slice the result set. */
    pagination: PaginationValues;
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