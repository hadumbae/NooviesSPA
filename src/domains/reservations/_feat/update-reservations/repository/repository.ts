/**
 * @fileoverview Repository for administrative reservation update operations.
 */

import {buildURL} from "@/common/_feat/fetch-api";
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI.ts";
import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns.ts";

import {AdminReservation} from "@/domains/reservations";
import {
    PatchCancelReservationParams,
    PatchRefundReservationParams,
    PatchResetReservationExpiryParams,
    PatchUpdateReservationNotesParams
} from "@/domains/reservations/_feat/update-reservations/repository/repository.types.ts";
import {UpdateReservationBaseURL} from "@/domains/reservations/_feat/update-reservations/repository/baseURL.ts";

/** Updates the administrative notes field for a specific reservation. */
export const patchUpdateReservationNotes = (
    {_id, data}: PatchUpdateReservationNotesParams
): Promise<FetchRequestReturns<AdminReservation>> => {
    const url = buildURL({
        baseURL: UpdateReservationBaseURL,
        path: `/update/${_id}/notes`
    });

    return useFetchAPI({method: "PATCH", url, data});
}

/** Resets the expiration TTL of a pending reservation to prevent timeout. */
export const patchResetReservationExpiry = (
    {_id}: PatchResetReservationExpiryParams
): Promise<FetchRequestReturns<AdminReservation>> => {
    const url = buildURL({
        baseURL: UpdateReservationBaseURL,
        path: `/update/${_id}/expiry`
    });

    return useFetchAPI({method: "PATCH", url});
}

/** Transitions a reservation status to cancelled. */
export const patchCancelReservation = (
    {_id, data}: PatchCancelReservationParams
): Promise<FetchRequestReturns<AdminReservation>> => {
    const url = buildURL({
        baseURL: UpdateReservationBaseURL,
        path: `/update/${_id}/cancel`
    });

    return useFetchAPI({method: "PATCH", url, data});
}

/** Transitions a reservation status to refunded. */
export const patchRefundReservation = (
    {_id, data}: PatchRefundReservationParams
): Promise<FetchRequestReturns<AdminReservation>> => {
    const url = buildURL({
        baseURL: UpdateReservationBaseURL,
        path: `/update/${_id}/refund`
    });

    return useFetchAPI({method: "PATCH", url, data});
}