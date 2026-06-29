/**
 * @fileoverview Mutation hook for cancelling an administrative reservation and updating its notes.
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";

import {AdminReservation, AdminReservationSchema} from "@/domains/reservations/_schema";
import {FetchByCodeQueryKeys} from "@/domains/reservations/_feat/fetch-reservation-by-code";
import {patchCancelReservation} from "@/domains/reservations/_feat/update-reservations/repository";
import {UpdateReservationNotesFormData} from "@/domains/reservations/_feat/update-reservations/forms";
import {ReservationUpdateMutationKeys} from "@/domains/reservations/_feat/update-reservations/mutations/mutationKeys.ts";

/** Props for the useCancelReservationMutation hook. */
type MutationProps = {
    reservationID: ObjectId;
}

/** Provides a mutation for cancelling a reservation with integrated success and error handling. */
export function useCancelReservationMutation(
    {reservationID}: MutationProps
): UseMutationResult<AdminReservation, unknown, UpdateReservationNotesFormData> {
    const queryClient = useQueryClient();

    const cancelReservation = async (values: UpdateReservationNotesFormData) => {
        const {result} = await patchCancelReservation({_id: reservationID, data: values});

        const {success, data, error} = validateData({
            data: result,
            schema: AdminReservationSchema,
            message: "Invalid data after cancelling reservation.",
        });

        if (!success) throw error;
        return data;
    }

    const onSuccess = () => {
        queryClient.invalidateQueries({queryKey: FetchByCodeQueryKeys.fetchByCode(), exact: false});
    }

    return useMutation({
        mutationKey: ReservationUpdateMutationKeys.cancel({reservationID}),
        mutationFn: cancelReservation,
        onSuccess,
    });
}