/**
 * @fileoverview Type definitions for the customer movie review repository.
 */

import {ObjectId} from "@/common/_schemas";

/** Configuration parameters for fetching a granular view of a specific movie review. */
export type GetFetchCustomerReviewViewDataConfig = {
    customerID: ObjectId;
    reviewID: ObjectId;
}