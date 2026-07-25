/**
 * @fileoverview Type definitions for the user details admin view data repository.
 */

import {ObjectId} from "@/common/_schemas";

/** Configuration for fetching composite user details view data. */
export type GetFetchUserDetailsViewDataConfig = {
    userID: ObjectId;
    reviewCount?: number;
    reservationCount?: number;
};