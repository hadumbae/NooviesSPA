/**
 * @fileoverview API repository for client-side reservation updates including checkout and cancellation.
 *
 */

import {ObjectId} from "@/common/_schemas";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI.ts";
import {buildURL} from "@/common/_feat/fetch-api";

const baseURL = `/api/v1/feat/update-client-reservations`;

/** Transitions a pending reservation hold to a paid state. */
export const patchCheckoutTicket = (
    _id: ObjectId
): Promise<RequestReturns<void>> => {
    const url = buildURL({
        baseURL: baseURL,
        path: `/checkout/${_id}`,
    });

    return useFetchAPI({method: "PATCH", url});
};

/** Manually voids a reservation and releases any associated seat holds. */
export const patchCancelClientReservation = (
    _id: ObjectId
): Promise<RequestReturns<void>> => {
    const url = buildURL({
        baseURL: baseURL,
        path: `/cancel/${_id}`,
    });

    return useFetchAPI({method: "PATCH", url});
};