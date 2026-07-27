/**
 * @fileoverview Type definitions for the customer review moderation logs repository.
 */

import {PaginationValues} from "@/common/_feat/fetch-pagination-search-params";
import {ObjectId} from "@/common/_schemas";

/** Configuration for fetching customer review moderation log view data. */
export type GetFetchCustomerReviewLogsViewDataConfig = {
    customerID: ObjectId;
    reviewID: ObjectId;
    pagination: PaginationValues;
}