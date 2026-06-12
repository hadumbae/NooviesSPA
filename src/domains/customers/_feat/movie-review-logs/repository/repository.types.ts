/**
 * @fileoverview Type definitions for the customer review moderation logs repository.
 */

import {UserUniqueCode} from "@/domains/users/schema/fields/UserUniqueCodeSchema.ts";
import {MovieReviewUniqueCode} from "@/domains/movieReviews/schemas";
import {PaginationValues} from "@/common/_feat/fetch-pagination-search-params";

/** Configuration for fetching customer review moderation log view data. */
export type GetFetchCustomerReviewLogsViewDataConfig = {
    customerCode: UserUniqueCode
    reviewCode: MovieReviewUniqueCode
    pagination: PaginationValues
}