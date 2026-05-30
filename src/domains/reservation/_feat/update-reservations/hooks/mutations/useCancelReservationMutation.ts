/**
 * @fileoverview Mutation hook for cancelling an administrative reservation and updating its notes.
 *
 */
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {
    ReservationUpdateMutationKeys
} from "@/domains/reservation/_feat/update-reservations/hooks/mutations/mutationKeys.ts";
import {
    UpdateReservationNotesFormSubmit,
    UpdateReservationNotesFormValues
} from "@/domains/reservation/_feat/update-reservations/hooks/forms";
import {patchCancelReservation,} from "@/domains/reservation/_feat/update-reservations/repositories";
import {AdminReservation, AdminReservationSchema} from "@/domains/reservation/schema/model";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {UseFormReturn} from "react-hook-form";
import {MutationResponseConfig} from "@/common/_feat/submit-data";
import {
    useUpdateAdminReservationErrorHandler,
    useUpdateAdminReservationSuccessHandler
} from "@/domains/reservation/_feat/update-reservations/hooks/mutation-helpers";
import {toast} from "react-toastify";

/** Props for the useCancelReservationMutation hook. */
type MutationProps = {
    reservationID: ObjectId;
    form: UseFormReturn<UpdateReservationNotesFormValues, unknown, UpdateReservationNotesFormSubmit>;
    onSubmitConfig: MutationResponseConfig<AdminReservation, UpdateReservationNotesFormSubmit>;
}

/** Provides a mutation for cancelling a reservation with integrated success and error handling. */
export function useCancelReservationMutation(
    {reservationID, form, onSubmitConfig}: MutationProps
): UseMutationResult<AdminReservation, unknown, UpdateReservationNotesFormSubmit> {
    const {onSubmit, submitMessage, onSubmitSuccess, onSubmitError, successMessage, errorMessage} = onSubmitConfig;

    const cancelReservation = async (values: UpdateReservationNotesFormSubmit) => {
        submitMessage && toast.info(submitMessage);
        onSubmit?.(values);

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