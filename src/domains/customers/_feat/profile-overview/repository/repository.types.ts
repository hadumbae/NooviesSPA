/**
 * @fileoverview Type definitions for the customer profile overview repository.
 */

import {UserUniqueCode} from "@/domains/users/schema/fields/UserUniqueCodeSchema.ts";

/** Configuration for fetching a customer profile view. */
export type GetFetchCustomerProfileViewDataConfig = {
    customerCode: UserUniqueCode
}