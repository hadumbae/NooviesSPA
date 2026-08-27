/**
 * @fileoverview Form component and hook exports for updating reservation notes.
 */

import {createForm} from "@/common/_feat";
import {
    UpdateReservationNotesFormData,
    UpdateReservationNotesFormDataSchema,
    UpdateReservationNotesFormValues
} from "@/domains/reservations/_feat/update-reservations/forms";
import {
    useUpdateReservationNotesMutation,
    UseUpdateReservationNotesMutationParams
} from "@/domains/reservations/_feat/update-reservations/mutations";
import {AdminReservation} from "@/domains/reservations";

const {SubmitForm, useSubmitForm} = createForm<
    UpdateReservationNotesFormValues,
    UpdateReservationNotesFormData,
    unknown,
    AdminReservation,
    UseUpdateReservationNotesMutationParams
>({
    schema: UpdateReservationNotesFormDataSchema,
    formName: "update-reservation-notes-form",
    mutation: useUpdateReservationNotesMutation,
    defaultValues: {
        notes: "",
    }
});

export {
    /** Form component for updating reservation notes. */
        SubmitForm as UpdateReservationNotesForm,
    /** Hook for managing reservation notes form state and submission. */
        useSubmitForm as useUpdateReservationNotesForm,
}