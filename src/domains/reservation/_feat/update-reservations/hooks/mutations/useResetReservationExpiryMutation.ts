/**
 * @fileoverview Mutation hook for resetting reservation expiration (TTL) using centralized handlers.
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {
    ReservationUpdateMutationKeys
} from "@/domains/reservation/_feat/update-reservations/hooks/mutations/mutationKeys.ts";
import {patchResetReservationExpiry} from "@/domains/reservation/_feat/update-reservations/repositories";
import {AdminReservation, AdminReservationSchema} from "@/domains/reservation/schema/model";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {
    useUpdateAdminReservationSuccessHandler
} from "@/domains/reservation/_feat/update-reservations/hooks/mutation-helpers";
import {toast} from "react-toastify";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {parseErrorReturns} from "@/common/utility/parseErrorReturns.ts";
import {MutationResponseConfig} from "@/common/_feat/submit-data";

/** Props for the useResetReservationExpiryMutation hook. */
export type MutationProps = {
    reservationID: ObjectId;
    onSubmitConfig?: MutationResponseConfig<AdminReservation>;
}

/**
 * A TanStack Query mutation hook that extends the Time-To-Live (TTL) of a reservation.
 */
export function useResetReservationExpiryMutation(
    {reservationID, onSubmitConfig = {}}: MutationProps
): UseMutationResult<AdminReservation, unknown, void> {
    const {onSubmit, submitMessage, onSubmitSuccess, onSubmitError, successMessage, errorMessage} = onSubmitConfig;

    const resetExpiry = async () => {
        submitMessage && toast.info(submitMessage);
        onSubmit?.();

        const {result} = await patchResetReservationExpiry({
            _id: reservationID,
        });

        const {success, data, error} = validateData({
            data: result,
            schema: AdminReservationSchema,
            message: "Invalid data structure returned after resetting reservation expiry.",
        });

        if (!success) throw error;
        return data;
    }

    const onSuccess = useUpdateAdminReservationSuccessHandler({
        onSubmitSuccess,
        successMessage,
    });

    const onError = (error: unknown) => {
        if (errorMessage) toast.error(errorMessage);

        if (error instanceof HttpResponseError) {
            const payload = parseErrorReturns(error.payload);
            toast.error(payload?.message ?? `Request failed with status: ${error.status}`);
        } else {
            handleMutationResponseError({error});
        }

        onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: ReservationUpdateMutationKeys.expiry({reservationID}),
        mutationFn: resetExpiry,
        onSuccess,
        onError,
    });
}