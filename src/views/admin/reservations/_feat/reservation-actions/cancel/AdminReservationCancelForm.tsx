/**
 * @fileoverview Form component and hook exports for canceling an admin reservation.
 */

import {createForm} from "@/common/_feat";
import {AdminReservation} from "@/domains/reservations/_schema/model/admin-reservations";
import {
    UpdateReservationNotesFormData,
    UpdateReservationNotesFormDataSchema,
    UpdateReservationNotesFormValues,
} from "@/domains/reservations/_feat/update-reservations/forms";
import {
    useCancelReservationMutation,
    UseCancelReservationMutationConfig
} from "@/domains/reservations/_feat/update-reservations/mutations";

const {SubmitForm, useSubmitForm} = createForm<
    UpdateReservationNotesFormValues,
    UpdateReservationNotesFormData,
    unknown,
    AdminReservation,
    UseCancelReservationMutationConfig
>({
    schema: UpdateReservationNotesFormDataSchema,
    formName: "admin-reservation-cancel-form",
    mutation: useCancelReservationMutation,
    defaultValues: {
        notes: "",
    }
});

export {
    /** Form component for canceling an admin reservation. */
        SubmitForm as AdminReservationCancelForm,
    /** Hook for managing admin reservation cancellation form state and submission. */
        useSubmitForm as useAdminReservationCancelForm,
}