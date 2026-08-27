/**
 * @fileoverview Form component and hook exports for resetting an admin reservation's expiration time.
 */

import {createForm, EmptyFormData, EmptyFormValues} from "@/common/_feat";
import {AdminReservation,} from "@/domains/reservations/_schema/model";
import {UpdateReservationNotesFormDataSchema,} from "@/domains/reservations/_feat/update-reservations/forms";
import {
    UseRefundReservationMutationConfig,
    useResetReservationExpiryMutation
} from "@/domains/reservations/_feat/update-reservations/mutations";

const {SubmitForm, useSubmitForm} = createForm<
    EmptyFormValues,
    EmptyFormData,
    unknown,
    AdminReservation,
    UseRefundReservationMutationConfig
>({
    schema: UpdateReservationNotesFormDataSchema,
    formName: "admin-reservation-reset-expiry-form",
    mutation: useResetReservationExpiryMutation,
    defaultValues: {
        notes: "",
    }
});

export {
    /** Form component for resetting an admin reservation's expiration time. */
        SubmitForm as AdminReservationResetExpiryForm,
    /** Hook for managing admin reservation expiry reset form state and submission. */
        useSubmitForm as useAdminReservationResetExpiryForm,
}