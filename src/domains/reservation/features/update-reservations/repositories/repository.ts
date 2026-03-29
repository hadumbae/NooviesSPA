/**
 * @file Repository for administrative reservation update operations.
 * @filename repository.ts
 */

import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import {
    PatchCancelReservationParams, PatchRefundReservationParams, PatchResetReservationExpiryParams,
    PatchUpdateReservationNotesParams
} from "@/domains/reservation/features/update-reservations/repositories/repository.types.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";

/**
 * Base administrative feature URL for reservation updates.
 * Derived from the environment variable `VITE_API_URL`.
 */
const baseURL = `${import.meta.env.VITE_API_URL}/api/v1/admin/reservations/feat`;

/**
 * Sends a PATCH request to update administrative notes for a specific reservation.
 * @param params - Object containing the reservation `_id` and the validated notes payload.
 * @returns A promise resolving to a {@link RequestReturns} object containing the updated reservation data.
 */
export const patchUpdateReservationNotes = (
    {_id, data}: PatchUpdateReservationNotesParams
): Promise<RequestReturns<unknown>> => {
    const url = buildQueryURL({
        baseURL,
        path: `update/${_id}/notes`
    });

    return useFetchAPI({method: "PATCH", url, data});
}

/**
 * Sends a PATCH request to reset the expiration TTL of a pending reservation.
 * @param params - Object containing the reservation `_id` to target.
 * @returns A promise resolving to a {@link RequestReturns} object with the refreshed document.
 */
export const patchResetReservationExpiry = (
    {_id}: PatchResetReservationExpiryParams
): Promise<RequestReturns<unknown>> => {
    const url = buildQueryURL({
        baseURL,
        path: `update/${_id}/expiry`
    });

    return useFetchAPI({method: "PATCH", url});
}

/**
 * Sends a PATCH request to transition a reservation status to 'CANCELLED'.
 * @param params - Object containing the reservation `_id` and optional cancellation context/notes.
 * @returns A promise resolving to a {@link RequestReturns} object with the cancelled record.
 */
export const patchCancelReservation = (
    {_id, data}: PatchCancelReservationParams
): Promise<RequestReturns<unknown>> => {
    const url = buildQueryURL({
        baseURL,
        path: `update/${_id}/cancel`
    });

    return useFetchAPI({method: "PATCH", url, data});
}

/**
 * Sends a PATCH request to transition a reservation status to 'REFUNDED'.
 * @param params - Object containing the reservation `_id` and optional refund remarks.
 * @returns A promise resolving to a {@link RequestReturns} object with the refunded record.
 */
export const patchRefundReservation = (
    {_id, data}: PatchRefundReservationParams
): Promise<RequestReturns<unknown>> => {
    const url = buildQueryURL({
        baseURL,
        path: `update/${_id}/refund`
    });

    return useFetchAPI({method: "PATCH", url, data});
}