/**
 * @file Logical container for the administrative reservation refund process.
 * @filename AdminReservationRefundForm.tsx
 */

import {
    useRefundReservationMutation,
    useUpdateReservationNotesForm
} from "@/domains/reservation/features/update-reservations/hooks";
import {UpdateReservationNotesFormSubmit} from "@/domains/reservation/features/update-reservations/schemas";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {AdminReservation} from "@/domains/reservation/schema/model";
import {Form} from "@/common/components/ui/form.tsx";
import {ReactNode} from "react";
import {
    UpdateReservationNotesFormContextProvider
} from "@/views/admin/reservation/update-reservation-notes/components/providers";

/**
 * Properties for the {@link AdminReservationRefundForm} component.
 * Extends {@link MutationOnSubmitParams} to handle post-refund navigation or notifications.
 */
type FormProps = MutationOnSubmitParams<AdminReservation> & {
    /** The UI components, confirmation messages, or inputs to render within the form. */
    children: ReactNode;

    /** The unique MongoDB ObjectId of the reservation to be refunded. */
    reservationID: ObjectId;

    /** * An optional identifier suffix.
     * Prevents HTML ID collisions if multiple refund triggers exist in a list or dashboard.
     */
    uniqueKey?: string;

    /** Initial values for the refund metadata (e.g., prepopulated refund reasons). */
    presetValues?: Partial<UpdateReservationNotesFormSubmit>;
};

/**
 * A controller component that manages the state and logic for refunding a reservation.
 */
export const AdminReservationRefundForm = (
    {children, reservationID, uniqueKey, presetValues, ...onSubmit}: FormProps
) => {
    const formKey = `res-status-refund-${uniqueKey ?? "form"}`;
    const form = useUpdateReservationNotesForm({presetValues});

    const {mutate} = useRefundReservationMutation({form, reservationID, onSubmit});

    const refundReservation = (values: UpdateReservationNotesFormSubmit) => {
        mutate(values);
    };

    return (
        <UpdateReservationNotesFormContextProvider formID={formKey}>
            <Form {...form}>
                <form id={formKey} onSubmit={form.handleSubmit(refundReservation)}>
                    {children}
                </form>
            </Form>
        </UpdateReservationNotesFormContextProvider>
    );
};