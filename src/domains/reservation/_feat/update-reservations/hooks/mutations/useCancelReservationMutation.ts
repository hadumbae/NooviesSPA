/**
 * @fileoverview Mutation hook for cancelling an administrative reservation.
 */
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {ReservationUpdateMutationKeys} from "@/domains/reservation/_feat/update-reservations/hooks/mutations/mutationKeys.ts";
import {UpdateReservationNotesFormSubmit} from "@/domains/reservation/_feat/update-reservations/schemas";
import {patchCancelReservation,} from "@/domains/reservation/_feat/update-reservations/repositories";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {AdminReservation, AdminReservationSchema} from "@/domains/reservation/schema/model";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {UseFormReturn} from "react-hook-form";
import {
    useUpdateAdminReservationSuccessHandler
} from "@/domains/reservation/_feat/update-reservations/hooks/mutation-helpers/useUpdateAdminReservationSuccessHandler.ts";
import {
    useUpdateAdminReservationErrorHandler
} from "@/domains/reservation/_feat/update-reservations/hooks/mutation-helpers/useUpdateAdminReservationErrorHandler.ts";

/** Props for the useCancelReservationMutation hook. */
type MutationProps = {
    reservationID: ObjectId;
    form: UseFormReturn<UpdateReservationNotesFormSubmit>;
    onSubmit: MutationOnSubmitParams<AdminReservation>;
}

/** Provides a mutation for cancelling a reservation with integrated success and error handling. */
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