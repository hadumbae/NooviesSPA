/**
 * @fileoverview Mutation hook for processing administrative reservation refunds.
 */
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {
    ReservationUpdateMutationKeys
} from "@/domains/reservation/_feat/update-reservations/hooks/mutations/mutationKeys.ts";
import {
    UpdateReservationNotesFormSubmit,
} from "@/domains/reservation/_feat/update-reservations/schemas";
import {
    patchRefundReservation,
} from "@/domains/reservation/_feat/update-reservations/repositories";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {AdminReservation, AdminReservationSchema} from "@/domains/reservation/schema/model";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {UseFormReturn} from "react-hook-form";
import {
    useUpdateAdminReservationSuccessHandler
} from "@/domains/reservation/_feat/update-reservations/hooks/mutation-helpers/useUpdateAdminReservationSuccessHandler.ts";
import {useUpdateAdminReservationErrorHandler} from "@/domains/reservation/_feat/update-reservations/hooks";

/** Props for the useRefundReservationMutation hook. */
export type MutationProps = {
    reservationID: ObjectId;
    form: UseFormReturn<UpdateReservationNotesFormSubmit>;
    onSubmit: MutationOnSubmitParams<AdminReservation>;
}

/** TanStack Query mutation hook that transitions a reservation to a refunded status. */
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