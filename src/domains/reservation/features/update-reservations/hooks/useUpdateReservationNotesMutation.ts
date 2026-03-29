/**
 * @file Mutation hook for updating administrative reservation notes.
 * @filename useUpdateReservationNotesMutation.ts
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {ReservationUpdateMutationKeys} from "@/domains/reservation/features/update-reservations/hooks/mutationKeys.ts";
import {
    ReservationNotesFormSubmit,
    ReservationNotesFormValues
} from "@/domains/reservation/features/update-reservations/schemas";
import {patchUpdateReservationNotes} from "@/domains/reservation/features/update-reservations/repositories";
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
 * Props for the {@link useUpdateReservationNotesMutation} hook.
 */
type MutationProps = {
    /** The target reservation's unique identifier. */
    reservationID: ObjectId;
    /** The React Hook Form instance for error mapping and state management. */
    form: UseFormReturn<ReservationNotesFormValues>;
    /** Standardized submission handlers and messaging configuration. */
    onSubmit: MutationOnSubmitParams<AdminReservation>;
}

/**
 * Provides a mutation for updating reservation notes with integrated validation and error handling.
 * @param props - Identity, form context, and submission callbacks.
 * @returns A TanStack Query mutation result object.
 */
export function useUpdateReservationNotesMutation(
    {reservationID, form, onSubmit}: MutationProps
): UseMutationResult<AdminReservation, unknown, ReservationNotesFormSubmit> {
    const {onSubmitSuccess, onSubmitError, successMessage, errorMessage} = onSubmit;

    const submitNotes = async (values: ReservationNotesFormSubmit) => {
        const {result} = await patchUpdateReservationNotes({
            _id: reservationID,
            data: values,
        });

        const {success, data, error} = validateData({
            data: result,
            schema: AdminReservationSchema,
            message: "Invalid data after updating notes.",
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
        mutationKey: ReservationUpdateMutationKeys.notes({reservationID}),
        mutationFn: submitNotes,
        onSuccess,
        onError,
    });
}