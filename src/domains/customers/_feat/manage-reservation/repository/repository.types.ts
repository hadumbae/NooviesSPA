/**
 * @fileoverview Type definitions for configuration options used in customer reservation data fetching.
 */

import {ObjectId} from "@/common/_schemas";

/** Configuration parameters required to fetch data for a specific customer reservation view. */
export type GetFetchCustomerReservationViewDataConfig = {
    customerID: ObjectId;
    reservationID: ObjectId;
}