/**
 * @fileoverview Mutation hook for processing administrative reservation refunds and updating cache.
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";

import {AdminReservation, AdminReservationSchema} from "@/domains/reservations/_schema";
import {FetchByCodeQueryKeys} from "@/domains/reservations/_feat/fetch-reservation-by-code";
import {patchRefundReservation} from "@/domains/reservations/_feat/update-reservations/repository";
import {ReservationUpdateMutationKeys} from "@/domains/reservations/_feat/update-reservations/mutations/mutationKeys.ts";
import {
    UpdateReservationNotesFormData,
} from "@/domains/reservations/_feat/update-reservations/forms";

/** Props for the useRefundReservationMutation hook. */
export type MutationProps = {
    reservationID: ObjectId;
}

/** Mutation hook that transitions a reservation to a refunded status and invalidates relevant queries. */
export function useRefundReservationMutation(
    {reservationID}: MutationProps
): UseMutationResult<AdminReservation, unknown, UpdateReservationNotesFormData> {
    const queryClient = useQueryClient();

    const refundReservation = async (values: UpdateReservationNotesFormData) => {
        const {result} = await patchRefundReservation({_id: reservationID, data: values});

        const {success, data, error} = validateData({
            data: result,
            schema: AdminReservationSchema,
            message: "Invalid data structure returned after processing reservation refund.",
        });

        if (!success) throw error;
        return data;
    }

    const onSuccess = () => {
        queryClient.invalidateQueries({queryKey: FetchByCodeQueryKeys.fetchByCode(), exact: false});
    }


    return useMutation({
        mutationKey: ReservationUpdateMutationKeys.refund({reservationID}),
        mutationFn: refundReservation,
        onSuccess,
    });
}