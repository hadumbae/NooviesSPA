/**
 * @file Mutation hook for processing administrative reservation refunds.
 * @filename useRefundReservationMutation.ts
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {
    ReservationUpdateMutationKeys
} from "@/domains/reservation/features/update-reservations/hooks/keys/mutationKeys.ts";
import {
    UpdateReservationNotesFormSubmit,
} from "@/domains/reservation/features/update-reservations/schemas";
import {
    patchRefundReservation,
} from "@/domains/reservation/features/update-reservations/repositories";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {AdminReservation, AdminReservationSchema} from "@/domains/reservation/schema/model";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {UseFormReturn} from "react-hook-form";
import {
    useUpdateAdminReservationSuccessHandler
} from "@/domains/reservation/features/update-reservations/hooks/mutation-helpers/useUpdateAdminReservationSuccessHandler.ts";
import {useUpdateAdminReservationErrorHandler} from "@/domains/reservation/features/update-reservations/hooks";

/**
 * Properties for the {@link useRefundReservationMutation} hook.
 */
type MutationProps = {
    /** The unique MongoDB ObjectId of the reservation targeted for refund. */
    reservationID: ObjectId;

    /** The React Hook Form instance used to map server-side validation errors back to the UI. */
    form: UseFormReturn<UpdateReservationNotesFormSubmit>;

    /**
     * Standardized submission handlers.
     * Configures success/error callbacks and custom toast notification messages.
     */
    onSubmit: MutationOnSubmitParams<AdminReservation>;
}

/**
 * A TanStack Query mutation hook that transitions a reservation to a 'REFUNDED' status.
 * @param props - Identity, form context, and callback configurations.
 * @returns A mutation result for managing the refund lifecycle and loading states.
 */
export function useRefundReservationMutation(
    {reservationID, form, onSubmit}: MutationProps
): UseMutationResult<AdminReservation, unknown, UpdateReservationNotesFormSubmit> {
    const {onSubmitSuccess, onSubmitError, successMessage, errorMessage} = onSubmit;

    const refundReservation = async (values: UpdateReservationNotesFormSubmit) => {
        const {result} = await patchRefundReservation({
            _id: reservationID,
            data: values,
        });

        const {success, data, error} = validateData({
            data: result,
            schema: AdminReservationSchema,
            message: "Invalid data structure returned after processing reservation refund.",
        });

        if (!success) throw error;
        return data;
    }

    const onSuccess = useUpdateAdminReservationSuccessHandler({
        successMessage,
        onSubmitSuccess,
    });

    const onError = useUpdateAdminReservationErrorHandler({
       form,
       onSubmitError,
       errorMessage,
    });

    return useMutation({
        mutationKey: ReservationUpdateMutationKeys.refund({reservationID}),
        mutationFn: refundReservation,
        onSuccess,
        onError,
    });
}