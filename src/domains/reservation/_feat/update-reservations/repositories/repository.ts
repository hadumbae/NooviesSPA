/**
 * @fileoverview Repository for administrative reservation update operations.
 *
 */
import {
    PatchCancelReservationParams, PatchRefundReservationParams, PatchResetReservationExpiryParams,
    PatchUpdateReservationNotesParams
} from "@/domains/reservation/_feat/update-reservations/repositories/repository.types.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {AdminReservation} from "@/domains/reservation/schema";
import {buildURL} from "@/common/_feat/fetch-api";
import {UpdateReservationBaseURL} from "@/domains/reservation/_feat/update-reservations";

/** Updates the administrative notes field for a specific reservation. */
export const patchUpdateReservationNotes = (
    {_id, data}: PatchUpdateReservationNotesParams
): Promise<RequestReturns<AdminReservation>> => {
    const url = buildURL({
        baseURL: UpdateReservationBaseURL,
        path: `/update/${_id}/notes`
    });

    return useFetchAPI({method: "PATCH", url, data});
}

/** Resets the expiration TTL of a pending reservation to prevent timeout. */
export const patchResetReservationExpiry = (
    {_id}: PatchResetReservationExpiryParams
): Promise<RequestReturns<AdminReservation>> => {
    const url = buildURL({
        baseURL: UpdateReservationBaseURL,
        path: `/update/${_id}/expiry`
    });

    return useFetchAPI({method: "PATCH", url});
}

/** Transitions a reservation status to cancelled. */
export const patchCancelReservation = (
    {_id, data}: PatchCancelReservationParams
): Promise<RequestReturns<AdminReservation>> => {
    const url = buildURL({
        baseURL: UpdateReservationBaseURL,
        path: `/update/${_id}/cancel`
    });

    return useFetchAPI({method: "PATCH", url, data});
}

/** Transitions a reservation status to refunded. */
export const patchRefundReservation = (
    {_id, data}: PatchRefundReservationParams
): Promise<RequestReturns<AdminReservation>> => {
    const url = buildURL({
        baseURL: UpdateReservationBaseURL,
        path: `/update/${_id}/refund`
    });

    return useFetchAPI({method: "PATCH", url, data});
}