/**
 * @file Mutation hook for cancelling an administrative reservation.
 * @filename useCancelReservationMutation.ts
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {ReservationUpdateMutationKeys} from "@/domains/reservation/features/update-reservations/hooks/keys/mutationKeys.ts";
import {
    UpdateReservationNotesFormSubmit,
    UpdateReservationNotesFormValues
} from "@/domains/reservation/features/update-reservations/schemas";
import {
    patchCancelReservation,
} from "@/domains/reservation/features/update-reservations/repositories";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {AdminReservation, AdminReservationSchema} from "@/domains/reservation/schema/model";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {UseFormReturn} from "react-hook-form";
import {
    useUpdateAdminReservationSuccessHandler
} from "@/domains/reservation/features/update-reservations/hooks/mutation-helpers/useUpdateAdminReservationSuccessHandler.ts";
import {
    useUpdateAdminReservationErrorHandler
} from "@/domains/reservation/features/update-reservations/hooks/mutation-helpers/useUpdateAdminReservationErrorHandler.ts";

/**
 * Props for the {@link useUpdateReservationNotesMutation} hook.
 */
type MutationProps = {
    /** The unique identifier of the reservation to be cancelled. */
    reservationID: ObjectId;
    /** React Hook Form instance for managing notes/reasoning field states and errors. */
    form: UseFormReturn<UpdateReservationNotesFormValues>;
    /** Standardized handlers for submission lifecycle events. */
    onSubmit: MutationOnSubmitParams<AdminReservation>;
}

/**
 * Provides a mutation for cancelling a reservation with integrated success and error handling.
 * @param props - Configuration including ID, form context, and callbacks.
 * @returns A TanStack Query mutation result for the cancellation process.
 */
export function useCancelReservationMutation(
    {reservationID, form, onSubmit}: MutationProps
): UseMutationResult<AdminReservation, unknown, UpdateReservationNotesFormSubmit> {
    const {onSubmitSuccess, onSubmitError, successMessage, errorMessage} = onSubmit;

    const cancelReservation = async (values: UpdateReservationNotesFormSubmit) => {
        const {result} = await patchCancelReservation({
            _id: reservationID,
            data: values,
        });

        const {success, data, error} = validateData({
            data: result,
            schema: AdminReservationSchema,
            message: "Invalid data after cancelling reservation.",
        });

        if (!success) throw error;
        return data;
    }

    const onSuccess = useUpdateAdminReservationSuccessHandler({
        onSubmitSuccess,
        successMessage,
    });

    const onError = useUpdateAdminReservationErrorHandler({
        form,
        errorMessage,
        onSubmitError,
    });

    return useMutation({
        mutationKey: ReservationUpdateMutationKeys.cancel({reservationID}),
        mutationFn: cancelReservation,
        onSuccess,
        onError,
    });
}