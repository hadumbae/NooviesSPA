/**
 * @file Logical container for administrative reservation cancellation logic.
 * @filename AdminReservationCancelForm.tsx
 */

import {UpdateReservationNotesFormSubmit} from "@/domains/reservation/features/update-reservations/schemas";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {AdminReservation} from "@/domains/reservation/schema/model";
import {ReactNode} from "react";
import {
    useCancelReservationMutation,
    useUpdateReservationNotesForm
} from "@/domains/reservation/features/update-reservations/hooks";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {Form} from "@/common/components/ui/form.tsx";
import {
    UpdateReservationNotesFormContextProvider
} from "@/views/admin/reservation/update-reservation-notes/components/providers";

/**
 * Properties for the {@link AdminReservationCancelForm} component.
 */
type FormProps = MutationOnSubmitParams<AdminReservation> & {
    /** The UI children (Dialog/Buttons) to wrap in form logic. */
    children: ReactNode;
    /** The MongoDB ObjectId of the reservation record. */
    reservationID: ObjectId;
    /** Optional CSS class for the form element. */
    className?: string;
    /** Suffix for the HTML form ID to prevent list-view collisions. */
    uniqueKey?: string;
    /** Initial values for the administrative notes field. */
    presetValues: Partial<UpdateReservationNotesFormSubmit>;
};

/**
 * A headless form controller that manages the state and submission of a cancellation request.
 */
export const AdminReservationCancelForm = (
    {children, reservationID, uniqueKey, presetValues, className, ...onSubmit}: FormProps
) => {
    const formKey = `res-cancel-reservation-${uniqueKey ?? "form"}`;
    const form = useUpdateReservationNotesForm({presetValues});

    const {mutate} = useCancelReservationMutation({reservationID, form, onSubmit});

    const cancelReservation = (values: UpdateReservationNotesFormSubmit) => {
        mutate(values);
    }

    return (
        <UpdateReservationNotesFormContextProvider formID={formKey}>
            <Form {...form}>
                <form
                    id={formKey}
                    onSubmit={form.handleSubmit(cancelReservation)}
                    className={className}
                >
                    {children}
                </form>
            </Form>
        </UpdateReservationNotesFormContextProvider>
    );
};