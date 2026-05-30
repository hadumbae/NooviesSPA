/**
 * @fileoverview Success handler hook for administrative reservation update mutations.
 */

import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {AdminReservation} from "@/domains/reservation/schema/model";
import {FetchByCodeQueryKeys} from "@/domains/reservation/_feat/fetch-reservation-by-code/fetch";
import {toast} from "react-toastify";

/** Configuration parameters for the reservation success handler. */
type HandlerParams = {
    successMessage?: string;
    onSubmitSuccess?: (response: AdminReservation) => void;
}

/** Returns a standardized success handling function for reservation-related mutations. */
export function useUpdateAdminReservationSuccessHandler(
    {successMessage, onSubmitSuccess}: HandlerParams = {}
): (reservation: AdminReservation) => void {
    const invalidateQueries = useInvalidateQueryKeys();

    return (reservation: AdminReservation) => {
        invalidateQueries(FetchByCodeQueryKeys.fetchByCode(), {exact: false});

        if (successMessage) toast.success(successMessage);
        onSubmitSuccess?.(reservation);
    }
}