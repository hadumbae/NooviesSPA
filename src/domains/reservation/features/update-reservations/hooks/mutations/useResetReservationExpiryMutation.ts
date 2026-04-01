/**
 * @file Mutation hook for resetting reservation expiration (TTL) using centralized handlers.
 * @filename useResetReservationExpiryMutation.ts
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {ReservationUpdateMutationKeys} from "@/domains/reservation/features/update-reservations/hooks/keys/mutationKeys.ts";
import {
    UpdateReservationNotesFormSubmit,
} from "@/domains/reservation/features/update-reservations/schemas";
import {
    patchResetReservationExpiry,
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
 * Props for the {@link useResetReservationExpiryMutation} hook.
 */
type MutationProps = {
    /** The target reservation's unique identifier. */
    reservationID: ObjectId;
    /** The React Hook Form instance for error mapping and state management. */
    form: UseFormReturn<UpdateReservationNotesFormSubmit>;
    /** Standardized submission handlers and messaging configuration. */
    onSubmit: MutationOnSubmitParams<AdminReservation>;
}

/**
 * Provides a mutation to extend the hold time of a reservation.
 * @param props - Identity, form context, and submission callbacks.
 * @returns A TanStack Query mutation result object.
 */
export function useResetReservationExpiryMutation(
    {reservationID, form, onSubmit}: MutationProps
): UseMutationResult<AdminReservation, unknown, void> {
    const {onSubmitSuccess, onSubmitError, successMessage, errorMessage} = onSubmit;

    const resetExpiry = async () => {
        const {result} = await patchResetReservationExpiry({
            _id: reservationID,
        });

        const {success, data, error} = validateData({
            data: result,
            schema: AdminReservationSchema,
            message: "Invalid return after resetting reservation expiry.",
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
        onSubmitError,
        errorMessage,
    });

    return useMutation({
        mutationKey: ReservationUpdateMutationKeys.expiry({reservationID}),
        mutationFn: resetExpiry,
        onSuccess,
        onError,
    });
}