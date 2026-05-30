/**
 * @fileoverview Mutation hook for updating administrative reservation notes.
 */
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {
    ReservationUpdateMutationKeys
} from "@/domains/reservation/_feat/update-reservations/hooks/mutations/mutationKeys.ts";
import {patchUpdateReservationNotes} from "@/domains/reservation/_feat/update-reservations/repositories";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {UseFormReturn} from "react-hook-form";
import {AdminReservation, AdminReservationSchema} from "@/domains/reservation/schema";
import {
    UpdateReservationNotesFormSubmit,
    UpdateReservationNotesFormValues
} from "@/domains/reservation/_feat/update-reservations/hooks/forms";
import {
    useUpdateAdminReservationSuccessHandler,
    useUpdateAdminReservationErrorHandler
} from "@/domains/reservation/_feat/update-reservations/hooks/mutation-helpers";
import {toast} from "react-toastify";
import {MutationResponseConfig} from "@/common/_feat/submit-data";

/** Props for the useUpdateReservationNotesMutation hook. */
type MutationProps = {
    reservationID: ObjectId;
    form: UseFormReturn<UpdateReservationNotesFormValues, unknown, UpdateReservationNotesFormSubmit>;
    onSubmitConfig: MutationResponseConfig<AdminReservation, UpdateReservationNotesFormSubmit>;
}

/**
 * Provides a mutation for updating reservation notes with integrated validation and error handling.
 */
export function useUpdateReservationNotesMutation(
    {reservationID, form, onSubmitConfig}: MutationProps
): UseMutationResult<AdminReservation, unknown, UpdateReservationNotesFormSubmit> {
    const {onSubmit, submitMessage, onSubmitSuccess, onSubmitError, successMessage, errorMessage} = onSubmitConfig;

    const submitNotes = async (values: UpdateReservationNotesFormSubmit) => {
        submitMessage && toast.info(submitMessage);
        onSubmit?.(values);

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