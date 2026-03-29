/**
 * @file Reusable success handler hook for administrative reservation update mutations.
 * @filename useUpdateAdminReservationSuccessHandler.ts
 */

import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {AdminReservation} from "@/domains/reservation/schema/model";
import {FetchByCodeQueryKeys} from "@/domains/reservation/views/admin/reservation-by-code/fetch";
import {toast} from "react-toastify";

/**
 * Configuration parameters for the reservation success handler.
 */
type HandlerParams = {
    /** Optional custom message to display in the success toast. */
    successMessage?: string;
    /** Optional callback executed after the mutation and cache invalidation are complete. */
    onSubmitSuccess?: (response: AdminReservation) => void;
}

/**
 * A specialized hook that returns a standardized success handling function
 * for reservation-related mutations.
 * @param params - Messaging and callback configuration.
 * @returns A function that accepts the updated {@link AdminReservation} and processes side effects.
 */
export function useUpdateAdminReservationSuccessHandler(
    {successMessage, onSubmitSuccess}: HandlerParams = {}
) {
    const invalidateQueries = useInvalidateQueryKeys();

    return (reservation: AdminReservation) => {
        invalidateQueries(FetchByCodeQueryKeys.fetchByCode(), {exact: false});

        if (successMessage) toast.success(successMessage);
        onSubmitSuccess?.(reservation);
    }
}