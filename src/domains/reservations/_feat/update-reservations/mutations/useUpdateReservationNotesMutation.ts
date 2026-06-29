/**
 * @fileoverview Mutation hook for updating administrative reservation notes.
 *
 */
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";

import {AdminReservation, AdminReservationSchema} from "@/domains/reservations/_schema";
import {FetchByCodeQueryKeys} from "@/domains/reservations/_feat/fetch-reservation-by-code";
import {UpdateReservationNotesFormData} from "@/domains/reservations/_feat/update-reservations/forms";
import {patchUpdateReservationNotes} from "@/domains/reservations/_feat/update-reservations/repository";
import {ReservationUpdateMutationKeys} from "@/domains/reservations/_feat/update-reservations/mutations/mutationKeys.ts";

/** Props for the useUpdateReservationNotesMutation hook. */
type MutationProps = {
    reservationID: ObjectId;
}

/** Provides a mutation for updating reservation notes with integrated validation and error handling. */
export function useUpdateReservationNotesMutation(
    {reservationID}: MutationProps
): UseMutationResult<AdminReservation, unknown, UpdateReservationNotesFormData> {
    const queryClient = useQueryClient();

    const submitNotes = async (values: UpdateReservationNotesFormData) => {
        const {result} = await patchUpdateReservationNotes({_id: reservationID, data: values});

        const {success, data, error} = validateData({
            data: result,
            schema: AdminReservationSchema,
            message: "Invalid data after updating notes.",
        });

        if (!success) throw error;
        return data;
    }

    const onSuccess = () => {
        queryClient.invalidateQueries({queryKey: FetchByCodeQueryKeys.fetchByCode(), exact: false});
    }

    return useMutation({
        mutationKey: ReservationUpdateMutationKeys.notes({reservationID}),
        mutationFn: submitNotes,
        onSuccess,
    });
}