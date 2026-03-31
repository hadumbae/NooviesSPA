/**
 * @file API repository for client-side reservation updates (Checkout and Cancellation).
 * @filename repository.ts
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";

/** * Root endpoint for client-facing reservation features.
 */
const baseURL = `${import.meta.env.VITE_API_URL}/api/v1/feat/client-reservations`;

/**
 * Transitions a pending reservation hold to a 'PAID' state.
 * @param _id - The unique identifier of the reservation to check out.
 * @returns A promise resolving to the standardized {@link RequestReturns} wrapper.
 */
export const patchCheckoutTicket = (
    _id: ObjectId
): Promise<RequestReturns> => {
    const url = buildQueryURL({
        baseURL: baseURL,
        path: `checkout/${_id}`,
    });

    return useFetchAPI({method: "PATCH", url});
};

/**
 * Manually voids a reservation and releases any associated seat holds.
 * @param _id - The unique identifier of the reservation to cancel.
 * @returns A promise resolving to the standardized {@link RequestReturns} wrapper.
 */
export const patchCancelReservation = (
    _id: ObjectId
): Promise<RequestReturns> => {
    const url = buildQueryURL({
        baseURL: baseURL,
        path: `cancel/${_id}`,
    });

    return useFetchAPI({method: "PATCH", url});
};