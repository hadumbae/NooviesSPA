/**
 * @fileoverview Type definitions for the customer movie reviews repository.
 */

import {UserUniqueCode} from "@/domains/users/schema/fields/UserUniqueCodeSchema";
import {PaginationValues} from "@/common/_feat/fetch-pagination-search-params/schemas/PaginationValuesSchema";

/** Configuration for fetching a paginated list of reviews by a customer. */
export type GetFetchCustomerReviewsViewDataConfig = {
    customerCode: UserUniqueCode
    pagination: PaginationValues
}