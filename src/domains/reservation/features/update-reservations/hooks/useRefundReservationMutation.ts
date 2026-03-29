/**
 * @file Mutation hook for processing administrative reservation refunds.
 * @filename useRefundReservationMutation.ts
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {ReservationUpdateMutationKeys} from "@/domains/reservation/features/update-reservations/hooks/mutationKeys.ts";
import {
    ReservationNotesFormSubmit,
    ReservationNotesFormValues
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
} from "@/domains/reservation/features/update-reservations/hooks/useUpdateAdminReservationSuccessHandler.ts";
import {
    useUpdateAdminReservationErrorHandler
} from "@/domains/reservation/features/update-reservations/hooks/useUpdateAdminReservationErrorHandler.ts";

/**
 * Props for the {@link useRefundReservationMutation} hook.
 */
type MutationProps = {
    /** The target reservation's unique identifier. */
    reservationID: ObjectId;
    /** The React Hook Form instance for mapping server-side refund validation errors. */
    form: UseFormReturn<ReservationNotesFormValues>;
    /** Standardized handlers for post-refund UI logic and messaging. */
    onSubmit: MutationOnSubmitParams<AdminReservation>;
}

/**
 * Provides a mutation to transition a reservation to a 'REFUNDED' state.
 * @param props - Identity, form context, and submission callbacks.
 * @returns A TanStack Query mutation result object.
 */
export function useRefundReservationMutation(
    {reservationID, form, onSubmit}: MutationProps
): UseMutationResult<AdminReservation, unknown, ReservationNotesFormSubmit> {
    const {onSubmitSuccess, onSubmitError, successMessage, errorMessage} = onSubmit;

    const refundReservation = async (values: ReservationNotesFormSubmit) => {
        const {result} = await patchRefundReservation({
            _id: reservationID,
            data: values,
        });

        const {success, data, error} = validateData({
            data: result,
            schema: AdminReservationSchema,
            message: "Invalid data after refunding reservation.",
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